import React from 'react'
import { Text } from 'react-native'
import { lightBlue } from '../utils/colors'

export default function DeckHeader({ fontSize, title }) {
  return (
    <Text style={{color: lightBlue, fontSize: fontSize || 25, textAlign: 'center'}}>
      {title}
    </Text>
  )
}
