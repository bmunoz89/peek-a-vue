import { ref } from 'vue'

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

export interface ICard {
  position: number
  value: string
  key: number
  visible?: boolean
  matched?: boolean
}

export interface ICreateDeck {
  cardList: typeof cardList
}

const cardList = ref<ICard[]>([])

const initDeck = (totalCards: number): void => {
  for (let i = 0; i < totalCards; i++) {
    const cardItemIndex = i % 8

    cardList.value.push({
      key: i,
      value: cardItems[cardItemIndex],
      position: i,
      visible: true,
    })
  }
}

export default (totalCards: number): ICreateDeck => {
  initDeck(totalCards)

  return {
    cardList,
  }
}
