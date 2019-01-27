<template>
  <div
    id="ql-app-mention"
    class="ql-mention__list-container"
    v-if="visible">
    <ul class="ql-mention__list" v-if="visible">
      <mention-item
        v-for="(item, index) in mentionList"
        v-bind="item"
        :key="item.id"
        :highlight="index === highlightIndex"
        @mousedown.native="onItemClick(index, $event)"/>
    </ul>
  </div>
</template>

<script>
import MentionItem from './MentionItem';
export default {
  name: 'MentionList',

  components: {
    MentionItem,
  },

  props: {
    selectItem: {
      type: Function,
      required: true,
    }
  },

  data() {
    return {
      mentionList: [],
      visible: false,
      highlightIndex: 0
    }
  },

  computed: {
    currentData() {
      return this.mentionList[this.highlightIndex];
    }
  },

  watch: {
    visible(newVisible) {
      if (newVisible) {
        this.highlightIndex = 0;
      }
    }
  },

  methods: {
    prevItem() {
      this.highlightIndex = ((this.highlightIndex + this.mentionList.length) - 1) % this.mentionList.length;
    },
    nextItem() {
      this.highlightIndex = (this.highlightIndex + 1) % this.mentionList.length;
    },
    onItemClick(itemIndex, e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      this.highlightIndex = itemIndex;
      this.selectItem(this.currentData);
    }
  }
}
</script>

