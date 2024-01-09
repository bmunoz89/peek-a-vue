<template>
  <div class="outer-card">
    <div class="card" :class="flippedStyles" @click="onSelectCardClick">
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

<script lang="ts" setup>
import { computed } from 'vue'

export interface ISelectCardPayload {
  position: number
  matched: boolean
  faceValue: string
}

export interface Props {
  position: number
  value: string
  visible?: boolean
  matched?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  matched: false,
})

const flippedStyles = computed(() => {
  return props.visible ? 'is-flipped' : undefined
})

const emit = defineEmits<{
  (event: 'select-card', payload: ISelectCardPayload): void
}>()

const onSelectCardClick = () => {
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
