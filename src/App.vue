<template>
  <h1 class="sr-only">Peek-a-Vue</h1>
  <img class="title" src="/images/peek-a-vue-title.png" alt="Peek-a-Vue" />
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="card.key"
      :position="card.position"
      :value="card.value"
      :visible="card.visible"
      :matched="card.matched"
      @select-card="flipCard"
    />
  </transition-group>
  <h2>{{ status }}</h2>
  <button class="button" @click="restartGame">
    <img src="/images/restart.svg" alt="Restart Icon" />
    Restart Game
  </button>
</template>

<script lang="ts">
import { shuffle } from 'lodash'
import type { ISelectCardPayload } from '@/components/Card.vue'
import Card from '@/components/Card.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { launchConfetti } from '@/utilities/confetti'

interface ICard {
  position: number,
  value: string,
  key: number,
  visible?: boolean,
  matched?: boolean,
}

export default defineComponent({
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref<ICard[]>([])
    const userSelection = ref<ISelectCardPayload[]>([])
    const status = computed(() => {
      return (remainingPairs.value === 0)
        ? 'Player wins'
        : `Remaining Pairs: ${remainingPairs.value}`
    })
    const remainingPairs = computed(() => {
      const remainingCards = cardList.value
        .filter((card) => card.matched !== true).length

      return remainingCards / 2
    })

    const restartGame = () => {
      cardList.value = shuffle(cardList.value)

      cardList.value.forEach((card, index) => {
        card.position = index
        card.visible = false
        card.matched = false
      })
    }

    const cardItems: string[] = [
      'bat',
      'candy',
      'cauldron',
      'cupcake',
      'ghost',
      'moon',
      'pumpkin',
      'witch-hat',
    ]

    for (let i = 0; i < 16; i++) {
      const cardItemIndex = i % 8

      cardList.value.push({
        key: i,
        value: cardItems[cardItemIndex],
        position: i,
      })
    }

    let flippingCard = false
    let flippingCardTimeout: number

    const flipCard = (payload: ISelectCardPayload): void => {
      if (payload.matched) return

      if (userSelection.value.length === 2 && flippingCard) {
        clearTimeout(flippingCardTimeout)
        flippingCard = false
        flipBack()
      }

      switch (userSelection.value.length) {

      case 0:
        userSelection.value[0] = payload
        cardList.value[payload.position].visible = true
        break
      case 1:
        if (userSelection.value[0].position !== payload.position) {
          userSelection.value[1] = payload
          cardList.value[payload.position].visible = true
        }

        break

      }
    }

    const flipBack = (delay = 0): void => {
      const cardOne = userSelection.value[0]
      const cardTwo = userSelection.value[1]
      const hideCards = () => {
        cardList.value[cardOne.position].visible = false
        cardList.value[cardTwo.position].visible = false

        userSelection.value.length = 0

        flippingCard = false
      }

      if (delay === 0)
        return hideCards()

      flippingCard = true
      flippingCardTimeout = setTimeout(hideCards, delay)
    }

    watch(remainingPairs, (currentValue) => {
      if (currentValue !== 0) return

      launchConfetti()
    })

    watch(userSelection, (currentValue) => {
      if (currentValue.length !== 2) return

      const cardOne = currentValue[0]
      const cardTwo = currentValue[1]
      const matched = cardOne.faceValue === cardTwo.faceValue

      cardList.value[cardOne.position].matched = matched
      cardList.value[cardTwo.position].matched = matched

      if (matched) {
        cardList.value[cardOne.position].visible = true
        cardList.value[cardTwo.position].visible = true

        userSelection.value.length = 0
      } else {
        flipBack(1000)
      }
    }, {
      deep: true,
    })

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      restartGame,
    }
  },
})
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: calc(100vh - 120px);
  padding: 60px 0;
  text-align: center;
  background-image: url('/images/page-bg.png');
  background-color: #00070c;
  color: white;
}

.game-board {
  display: grid;
  grid-template: repeat(4, 120px) / repeat(4, 120px);
  gap: 24px;
  justify-content: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.title {
  padding-bottom: 30px;
}

.button {
  cursor: pointer;
  background-color: orange;
  color: white;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;

  img {
    padding-right: 5px;
  }
}

.shuffle-card-move {
  transition: transform ease-in 0.8s;
}
</style>
