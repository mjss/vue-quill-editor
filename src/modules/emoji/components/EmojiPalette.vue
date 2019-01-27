<template>
  <div
    id="ql-app-emoji"
    class="ql-emoji__palette-container"
    v-click-outside="onClickOutside"
    v-if="visible">
    <palette-tabs
      :emoji-types="emojiTypes"
      @tab-change="onTabChange" />
    <palette-pane
      :emojis="emojis"
      @emoji-click="onEmojiClick" />
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import PaletteTabs from './PaletteTabs';
import PalettePane from './PalettePane';
import emojiList from '../emoji-list';
import emojiTypes from '../emoji-types';

const filterEmoji = emojiType => emojiList
  .filter(x => x.category === emojiType.type)
  .sort((a, b) => a.emoji_order - b.emoji_order);

const defaultEmojiType = emojiTypes[0];

export default {
  name: 'EmojiPalette',

  components: {
    PaletteTabs,
    PalettePane
  },

  props: {
    selectItem: {
      type: Function,
      required: true,
    }
  },

  directives: {
    clickOutside: vClickOutside.directive
  },

  data() {
    return {
      emojis: filterEmoji(defaultEmojiType),
      emojiTypes: emojiTypes,
      visible: false,
      outsideClick: 0,
    }
  },

  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.outsideClick = 0;
    },
    onTabChange(emojiType) {
      this.emojis = filterEmoji(emojiType);
    },
    onEmojiClick(emojiItem) {
      this.selectItem(emojiItem);
    },
    onClickOutside() {
      if (++this.outsideClick > 1) {
        this.visible = false;
        this.outsideClick = 0;
      }
    }
  }
}
</script>

