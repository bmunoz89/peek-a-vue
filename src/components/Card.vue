<template>
  <div class="outer-card">
    <div class="card" :class="flippedStyles" @click="selectCard">
      <div class="card-face is-front">
        <img
          class="card-img"
          :src="`/images/${value}.png`"
          :srcset="`/images/${value}@2x.png 2x`"
          :alt="value"
        />
        <img
          class="icon-checkmark"
          :class="{
            show: matched,
          }"
          src="/images/checkmark.svg"
        />
      </div>
      <div class="card-face is-back"></div>
    </div>
  </div>
</template>

<script lang="ts" setup="props, { emit }">
import { computed } from 'vue'

type TSelectCard = () => void

export interface ISelectCardPayload {
  position: number,
  matched: boolean,
  faceValue: string,
}

declare const props: {
  position: number,
  value: string,
  visible: boolean,
  matched: boolean,
}

export default {
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
}

export const flippedStyles = computed(() => {
  if (props.visible)
    return 'is-flipped'
})

interface IEmits {
  'select-card': ISelectCardPayload
}

declare function emit<
  T extends keyof IEmits
>(name: T, attribute: IEmits[T]): void

export const selectCard: TSelectCard = () => {
  emit('select-card', {
    position: props.position,
    matched: props.matched,
    faceValue: props.value,
  })
}
</script>

<style lang="scss" scoped>
.outer-card {
  display: grid;
  perspective: 1000px;
}

.card {
  text-align: center;
  position: relative;
  transition: transform ease-in-out 0.8s;
  transform-style: preserve-3d;

  .card-face {
    width: 100%;
    height: 100%;
    position: absolute;
    border: 1px solid black;
    border-radius: 10px;
    backface-visibility: hidden;
    transition: border-color ease-in-out 0.8s;

    &.is-front {
      background-image: url('/images/card-bg.png');
      transform: rotateY(180deg);

      .icon-checkmark {
        position: absolute;
        right: 5px;
        bottom: 5px;
        opacity: 0;
        transition: opacity ease-in-out 0.3s 0.4s;

        &.show {
          opacity: 1;
        }
      }
    }
    &.is-back {
      background-image: url('/images/card-bg-empty.png');
    }

    .card-img {
      height: 100%;
      width: 100%;
    }
  }

  &.is-flipped {
    transform: rotateY(180deg);

    .card-face {
      border-color: #690ba8;
    }
  }
}
</style>
