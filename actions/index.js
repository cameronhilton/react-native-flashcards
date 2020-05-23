export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}
