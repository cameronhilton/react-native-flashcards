import React from 'react'
import { Text } from 'react-native'
import { lightBlue } from '../utils/colors'

export default function DeckHeader({ title }) {
  return (
    <Text style={{color: lightBlue, fontSize: 25}}>
      {title}
    </Text>
  )
}
