<template>
  <div class="card">{{ value }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
}
</style>
