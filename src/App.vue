<template>
  <h1>Peek-a-Vue</h1>
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :value="card"
    />
  </section>
</template>

<script lang="ts">
import Card from '@/components/Card.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList: number[] = []

    for (let i = 0; i < 16; i++) {
      cardList.push(i)
    }

    return { cardList }
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

  .card {
    border: 5px solid #ccc;
  }
}
</style>
