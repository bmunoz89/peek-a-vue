import shuffle from 'lodash/shuffle'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import type { ICard } from './createDeck'

export interface ICreateGame {
  newPlayer: typeof newPlayer
  startGame: typeof startGame
  restartGame: typeof restartGame
  status: typeof status
  remainingPairs: typeof remainingPairs
}

const newPlayer = ref<boolean>(true)
let deck: Ref<ICard[]>

const startGame = (): void => {
  newPlayer.value = false

  restartGame()
}

const restartGame = (): void => {
  deck.value = shuffle(deck.value)

  deck.value.forEach((card, index) => {
    card.position = index
    card.visible = false
    card.matched = false
  })
}

const remainingPairs: ComputedRef<number> = computed(() => {
  const remainingCards = deck.value.filter((card) => card.matched !== true)
    .length

  return remainingCards / 2
})

const status: ComputedRef<string> = computed(() => {
  return remainingPairs.value === 0
    ? 'Player wins'
    : `Remaining Pairs: ${remainingPairs.value}`
})

export default (cardList: Ref<ICard[]>): ICreateGame => {
  deck = cardList

  return {
    newPlayer,
    startGame,
    restartGame,
    status,
    remainingPairs,
  }
}
