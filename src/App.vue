<template>
  <h1 class="sr-only">Peek-a-Vue</h1>
  <img
    class="title"
    src="/images/peek-a-vue-title.png"
    srcset="/images/peek-a-vue-title@2x.png 2x"
    alt="Peek-a-Vue"
  />
  <section class="description">
    <p>Welcome to Peek-a-Vue, a Halloween themed card matching game!</p>
    <p class="powered-wrapper">
      Powered by
      <a class="powered-link" href="https://v3.vuejs.org/" target="_blank">
        <img
          class="powered-logo"
          src="/images/vue-logo.svg"
          alt="Vue.js logo"
        />
        Vue.js 3
      </a>
      <span>, </span>
      <a
        class="powered-link"
        href="https://www.netlify.com/?utm_source=github&utm_medium=peekavue-bh&utm_campaign=devex"
        target="_blank"
      >
        <img
          class="powered-logo"
          src="/images/netliheart.svg"
          alt="Netlify Heart Logo"
        />
        Netlify
      </a>
      <span> & </span>
      <a
        class="powered-link"
        href="https://github.com/bmunoz89/peek-a-vue"
        target="_blank"
      >
        <img
          class="powered-logo"
          src="/images/github-logo.svg"
          alt="GitHub Logo"
        />
        GitHub</a
      >
    </p>
  </section>
  <button v-if="newPlayer" class="button" @click="startGame">
    <img src="/images/play.svg" alt="Start Icon" />
    Start Game
  </button>
  <button v-else class="button" @click="restartGame">
    <img src="/images/restart.svg" alt="Restart Icon" />
    Restart Game
  </button>
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
  <h2 class="status">{{ status }}</h2>
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
    const newPlayer = ref<boolean>(true)

    const startGame = () => {
      newPlayer.value = false

      restartGame()
    }

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
        visible: true,
      })
    }

    let flippingCard = false
    let flippingCardTimeout: number

    const flipCard = (payload: ISelectCardPayload): void => {
      if (newPlayer.value) return

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
      newPlayer,
      startGame,
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

a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: calc(100vh - 120px);
  padding: 60px 0;
  text-align: center;
  background-image: url('/images/page-bg.png');
  background-color: #00070c;
  color: white;
}

.game-board {
  display: grid;
  grid-template: repeat(4, 70px) / repeat(4, 70px);
  gap: 12px;
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

.description {
  font-family: 'Titillium Web', sans-serif;
  p {
    margin: 0;
    font-size: 1rem;

    &:last-child {
      margin-top: 10px;
      margin-bottom: 30px;
      font-size: 0.9rem;
    }
  }

  .powered-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;

    .powered-link {
      padding: 0 5px;

      &:first-child,
      &:last-child {
        padding-right: 0;
      }

      .powered-logo {
        width: 18px;
      }
    }
  }
}

.status {
  font-family: 'Titillium Web', sans-serif;
}

.button {
  font-family: 'Titillium Web', sans-serif;
  cursor: pointer;
  background-color: #e78805;
  color: white;
  padding: 8px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-weight: bold;
  font-size: 1rem;
  border: 2px solid #e78805;
  border-radius: 10px;

  img {
    padding-right: 5px;
  }
}

.shuffle-card-move {
  transition: transform ease-in 0.8s;
}

@media screen and (min-width: 500px) {
  .game-board {
    grid-template: repeat(4, 100px) / repeat(4, 100px);
  }
}
@media screen and (min-width: 600px) {
  .game-board {
    grid-template: repeat(4, 120px) / repeat(4, 120px);
  }
}
</style>
