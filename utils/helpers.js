import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'

const DECK_STORAGE_KEY = 'FlashCards:decks'
const NOTIFICATION_KEY = 'FlashCards:notifications'

// return all of the decks along with their titles, questions, and answers
export async function getDecks() {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)

  if (results === null) {
    addSampleCards()

    return samples
  }

  return JSON.parse(results)
}

// return the deck associated with id
export async function getDeck(title) {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)

  return JSON.parse(results)[title]
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
export async function addCardToDeck(title, card) {
  const deck = await getDeck(title)

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      questions: deck.questions.concat([card]),
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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return {
    title: 'Take a quiz!',
    body: `👋 Don't forget to take a FlashCards quiz today!`,
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

// Set daily notification to take quiz
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then((status) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
