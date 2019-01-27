<template>
  <div class="ql-emoji__tabs">
    <div
      class="ql-emoji__tab-item"
      v-for="item in emojiTypes"
      :key="item.name"
      :class="{'is-active': activeTab.name === item.name}"
      @mousedown.prevent.stop="activeTab = item">
      <div :class="[`i-${item.name}`]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaletteTabs',

  props: {
    emojiTypes: {
      type: Array,
      default: [],
    }
  },

  data() {
    return {
      activeTab: this.emojiTypes[0] || null
    }
  },

  watch: {
    activeTab(newActiveTab) {
      this.$emit('tab-change', newActiveTab);
    },
    emojiTypes(newEmojiTypes) {
      if (newEmojiTypes && newEmojiTypes[0]) {
        this.activeTab = newEmojiTypes[0];
      }
    }
  }
}
</script>

