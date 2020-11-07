<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      {{ value }}
    </div>
    <div v-else class="card-face is-back">Back</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type TSelectCard = () => void

export interface ISelectCardPayload {
  position: number,
}

export default defineComponent({
  name: 'Card',
  props: {
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'select-card': (payload: ISelectCardPayload) => true,
  },
  setup(props, { emit }) {
    const selectCard: TSelectCard = () => {
      emit('select-card', {
        position: props.position,
      })
    }

    return { selectCard }
  },
})
</script>

<style lang="scss" scoped>
.card {
  border: 5px solid #ccc;
  text-align: center;
  position: relative;

  .card-face {
    width: 100%;
    height: 100%;
    position: absolute;

    &.is-front {
      background-color: red;
      color: white;
    }
    &.is-back {
      background-color: blue;
      color: white;
    }
  }
}
</style>
