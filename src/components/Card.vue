<template>
  <div class="outer-card">
    <div class="card" :class="flippedStyles" @click="selectCard">
      <div class="card-face is-front">
        <img
          :src="`/images/${value}.png`"
          :srcset="`/images/${value}@2x.png 2x`"
          :alt="value"
        />
        <img
          class="icon-checkmark"
          v-if="matched"
          src="/images/checkmark.svg"
        />
      </div>
      <div class="card-face is-back"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

type TSelectCard = () => void

export interface ISelectCardPayload {
  position: number,
  matched: boolean,
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
    const flippedStyles = computed(() => {
      if (props.visible)
        return 'is-flipped'
    })

    const selectCard: TSelectCard = () => {
      emit('select-card', {
        position: props.position,
        matched: props.matched,
        faceValue: props.value,
      })
    }

    return {
      selectCard,
      flippedStyles,
    }
  },
})
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
    display: flex;
    justify-content: center;
    align-content: center;
    backface-visibility: hidden;
    transition: border-color ease-in-out 0.8s;

    &.is-front {
      background-image: url('/images/card-bg.png');
      transform: rotateY(180deg);

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

  &.is-flipped {
    transform: rotateY(180deg);

    .card-face {
      border-color: #690ba8;
    }
  }
}
</style>
