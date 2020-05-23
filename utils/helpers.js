import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'FlashCards:decks'

// return all of the decks along with their titles, questions, and answers
export async function getDecks() {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  // TODO: remove after testing
  if (results === null) {
    addSampleCards()
  }
  
  return samples
}

// add title to the decks
export async function saveDeckTitle(title) {
  const newDeck = {
    [title]: {
      title,
      questions: [],
    },
  }

  await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
  return (newDeck)
}

// add the card to the list of questions for the deck with the associated title
export function addCardToDeck(title, card) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      questions: [card],
    },
  }))
}

const samples = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Puppy: {
    title: 'Puppy',
    questions: [
      {
        question: 'What is a puppy?',
        answer: 'A little pooch.'
      }
    ]
  }
}

function addSampleCards() {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(samples))
}
