import Vue from 'vue';
import MentionList from './components/MentionList';

const MentionListComponent = Vue.extend(MentionList);

const Keys = {
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40,
};

class Mention {
  constructor(quill, options) {
    this.isOpen = false;
    this.mentionCharPos = null;
    this.cursorPos = null;
    this.suspendMouseEnter = false;

    this.quill = quill;

    this.options = {
      mountId: null,
      source: null,
      mentionDenotationChars: ['@'],
      allowedChars: /^[a-zA-Z0-9_]*$/,
      minChars: 0,
      maxChars: 31,
      offsetTop: 2,
      offsetLeft: 0,
      isolateCharacter: false,
      onOpen() {
        return true;
      },
      onClose() {
        return true;
      }
    };

    Object.assign(this.options, options);

    quill.on('text-change', this.onTextChange.bind(this));
    quill.on('selection-change', this.onSelectionChange.bind(this));

    quill.keyboard.addBinding({
      key: Keys.TAB,
    }, this.selectHandler.bind(this));
    quill.keyboard.bindings[9].unshift(quill.keyboard.bindings[9].pop());

    quill.keyboard.addBinding({
      key: Keys.ENTER,
    }, this.selectHandler.bind(this));
    quill.keyboard.bindings[13].unshift(quill.keyboard.bindings[13].pop());

    quill.keyboard.addBinding({
      key: Keys.ESCAPE,
    }, this.escapeHandler.bind(this));

    quill.keyboard.addBinding({
      key: Keys.UP,
    }, this.upHandler.bind(this));

    quill.keyboard.addBinding({
      key: Keys.DOWN,
    }, this.downHandler.bind(this));

    let mountEl = `#${this.options.mountId}`;
    if (!this.options.mountId) {
      mountEl = document.createElement('div');
      document.body.appendChild(mountEl);
    }
    this.vm = new MentionListComponent({
      propsData: {
        selectItem: this.selectItem.bind(this)
      }
    }).$mount(mountEl);
  }

  selectHandler() {
    if (this.isOpen) {
      const data = this.vm.currentData;
      this.selectItem(data);
      return false;
    }
    return true;
  }

  escapeHandler() {
    if (this.isOpen) {
      this.hideMentionList();
      return false;
    }
    return true;
  }

  upHandler() {
    if (this.isOpen) {
      this.prevItem();
      return false;
    }
    return true;
  }

  downHandler() {
    if (this.isOpen) {
      this.nextItem();
      return false;
    }
    return true;
  }

  showMentionList() {
    this.isOpen = true;
    this.vm.visible = true;
  }

  hideMentionList() {
    this.isOpen = false;
    this.vm.visible = false;
  }

  selectItem(data) {    
    this.quill
      .deleteText(this.mentionCharPos, this.cursorPos - this.mentionCharPos, Quill.sources.API);
    this.quill.insertEmbed(this.mentionCharPos, 'mention', data, Quill.sources.API);
    this.quill.insertText(this.mentionCharPos + 1, ' ', Quill.sources.API);
    this.quill.setSelection(this.mentionCharPos + 2, Quill.sources.API);
    this.hideMentionList();
  }

  renderList(data) {
    if (data && data.length > 0) {
      this.vm.mentionList = data;
      this.showMentionList();
    } else {
      this.vm.mentionList = [];
      this.hideMentionList();
    }
  }

  nextItem() {
    this.suspendMouseEnter = true;
    this.vm.nextItem();
  }

  prevItem() {
    this.suspendMouseEnter = true;
    this.vm.prevItem();
  }

  hasValidChars(s) {
    return this.options.allowedChars.test(s);
  }

  setIsOpen(isOpen) {
    if (this.isOpen != isOpen) {
      if (isOpen) {
        this.options.onOpen();
      } else {
        this.options.onClose();
      }
      this.isOpen = isOpen;
    }
  }

  onSomethingChange() {
    const range = this.quill.getSelection();
    if (range == null) return;
    this.cursorPos = range.index;
    const startPos = Math.max(0, this.cursorPos - this.options.maxChars);
    const beforeCursorPos = this.quill.getText(startPos, this.cursorPos - startPos);
    const mentionCharIndex = this.options.mentionDenotationChars.reduce((prev, cur) => {
      const previousIndex = prev;
      const mentionIndex = beforeCursorPos.lastIndexOf(cur);

      return mentionIndex > previousIndex ? mentionIndex : previousIndex;
    }, -1);
    if (mentionCharIndex > -1) {
      if (this.options.isolateCharacter && !(mentionCharIndex === 0 || Boolean(beforeCursorPos[mentionCharIndex - 1].match(/\s/g)))) {
        this.hideMentionList();
        return;
      }
      const mentionCharPos = this.cursorPos - (beforeCursorPos.length - mentionCharIndex);
      this.mentionCharPos = mentionCharPos;
      const textAfter = beforeCursorPos.substring(mentionCharIndex + 1);
      if (textAfter.length >= this.options.minChars && this.hasValidChars(textAfter)) {
        const mentionChar = beforeCursorPos[mentionCharIndex];
        this.options.source(textAfter, this.renderList.bind(this), mentionChar);
      } else {
        this.hideMentionList();
      }
    } else {
      this.hideMentionList();
    }
  }

  onTextChange(delta, oldDelta, source) {
    if (source === 'user') {
      this.onSomethingChange();
    }
  }

  onSelectionChange(range) {
    if (range && range.length === 0) {
      this.onSomethingChange();
    } else {
      this.hideMentionList();
    }
  }
}

export default Mention;
