import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { red, white } from '../utils/colors'

export default function FloatBtn({ bgColor, iconName, navigation, onPress, params, position, text, toComponent }) {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => navigation.navigate(toComponent, {...params})}
      style={[styles.floatBtn, {
        backgroundColor: bgColor || red,
        alignSelf: position === 'center' && 'center',
        left: position === 'left' ? 0 : 'auto',
        right: position === 'right' ? 0 : 'auto',
      }]}
    >
      <FontAwesome name={iconName} size={40} color={white} />
      {text && <Text style={{color: white}}>{text}</Text>}
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  floatBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    height: 70,
    borderRadius: 100,
  }
})
