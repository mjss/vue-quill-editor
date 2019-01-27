<template>
  <div class="ql-emoji__pane">
    <span
      class="ql-emoji__pane-item"
      v-for="item in emojis"
      :key="item.name"
      @mousedown.prevent.stop="onItemClick(item)">{{getStringFromCodePoint(item)}}</span>
  </div>
</template>

<script>
export default {
  name: 'PalettePane',

  props: {
    emojis: {
      type: Array,
      default: [],
    }
  },

  methods: {
    onItemClick(item) {
      this.$emit('emoji-click', item);
    },

    getStringFromCodePoint(item) {
      return String.fromCodePoint.apply(null, item.unicode.split('-').map(x => `0x${x}`));
    }
  }
}
</script>

