<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value" />
      <img class="icon-checkmark" v-if="matched" src="/images/checkmark.svg" />
    </div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type TSelectCard = () => void

export interface ISelectCardPayload {
  position: number,
  faceValue: string,
}

export default defineComponent({
  name: 'Card',
  props: {
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    matched: {
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
        faceValue: props.value,
      })
    }

    return { selectCard }
  },
})
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
  position: relative;

  .card-face {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-content: center;

    &.is-front {
      background-image: url('/images/card-bg.png');

      .icon-checkmark {
        position: absolute;
        right: 5px;
        bottom: 5px;
      }
    }
    &.is-back {
      background-image: url('/images/card-bg-empty.png');
    }
  }
}
</style>
