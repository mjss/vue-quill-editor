<template>
  <li
    class="ql-mention__list-item"
    :class="{highlighted: highlight}"
    :data-id="id"
    :data-value="value">
    <span class="ql-mention__item-id">{{id}}</span>
    <span class="ql-mention__item-value">{{value}}</span>
  </li>
</template>

<script>
export default {
  name: 'MentionItem',

  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    denotationChar: {
      type: String,
      default: '@'
    },
    highlight: {
      type: Boolean,
      default: false
    }
  }
}
</script>
