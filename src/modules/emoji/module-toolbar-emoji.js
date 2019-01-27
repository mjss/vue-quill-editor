import Vue from 'vue';
import EmojiPalette from './components/EmojiPalette';

const EmojiPaletteComponent = Vue.extend(EmojiPalette);

const Module = Quill.import('core/module');

class ToolbarEmoji extends Module {
  constructor(quill, options) {
    super(quill, options);
    
    this.quill = quill;
    this.options = {
      buttonIcon: '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>'
    };

    Object.assign(this.options, options);

    this.toolbar = quill.getModule('toolbar');

    if (typeof this.toolbar !== 'undefined') {
      this.toolbar.addHandler('emoji', this.showEmojiPalette.bind(this));
    }

    const emojiBtns = document.getElementsByClassName('ql-emoji');
    
    if (emojiBtns) {
      [].slice.call(emojiBtns).forEach((emojiBtn) => {
        emojiBtn.innerHTML = this.options.buttonIcon;
      });
    }

    let mountEl = `#${this.options.mountId}`;
    if (!this.options.mountId) {
      mountEl = document.createElement('div');
      document.body.appendChild(mountEl);
    }
    this.vm = new EmojiPaletteComponent({
      propsData: {
        selectItem: this.selectItem.bind(this)
      }
    }).$mount(mountEl);
  }

  showEmojiPalette() {
    this.vm.open();
  }

  hideEmojiPalette() {
    this.vm.close();
  }

  selectItem(emojiItem) {
    const range = this.quill.getSelection();
    this.quill.insertEmbed(range.index, 'emoji', emojiItem);
    setTimeout(() => this.quill.setSelection(range.index + 1), 0);
  }
}

export default ToolbarEmoji;
