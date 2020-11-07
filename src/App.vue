<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :position="card.position"
      :value="card.value"
      :visible="card.visible"
      @select-card="flipCard"
    />
  </section>
</template>

<script lang="ts">
import type { ISelectCardPayload } from '@/components/Card.vue'
import Card from '@/components/Card.vue'
import { defineComponent, ref } from 'vue'

interface ICard {
  position: number,
  value: number,
  visible?: boolean,
}

export default defineComponent({
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref<ICard[]>([])

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        position: i,
        value: i,
      })
    }

    const flipCard = (payload: ISelectCardPayload) => {
      cardList.value[payload.position].visible = !cardList.value[payload.position].visible
    }

    return { cardList, flipCard }
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
