<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :position="card.position"
      :value="card.value"
      :visible="card.visible"
      :matched="card.matched"
      @select-card="flipCard"
    />
  </section>
  <h2>{{ status }}</h2>
</template>

<script lang="ts">
import type { ISelectCardPayload } from '@/components/Card.vue'
import Card from '@/components/Card.vue'
import { computed, defineComponent, ref, watch } from 'vue'

interface ICard {
  position: number,
  value: number,
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

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        position: i,
        value: i,
      })
    }

    const flipCard = (payload: ISelectCardPayload) => {
      cardList.value[payload.position].visible = true

      if (userSelection.value[0])
        userSelection.value[1] = payload
      else
        userSelection.value[0] = payload
    }

    watch(userSelection, (currentValue) => {
      if (currentValue.length !== 2) return

      const cardOne = currentValue[0]
      const cardTwo = currentValue[1]
      const matched = cardOne.faceValue === cardTwo.faceValue

      cardList.value[cardOne.position].matched = matched
      cardList.value[cardTwo.position].matched = matched

      cardList.value[cardOne.position].visible = matched
      cardList.value[cardTwo.position].visible = matched

      userSelection.value.length = 0
    }, {
      deep: true,
    })

    return {
      cardList,
      flipCard,
      userSelection,
      status,
    }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

.game-board {
  display: grid;
  grid-template: repeat(4, 100px) / repeat(4, 100px);
  gap: 30px;
  justify-content: center;
}
</style>
