import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { red, white } from '../utils/colors'

export default function FloatBtn({ alignSelf, bgColor, iconName, navigation, onPress, params, text, toComponent }) {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => navigation.navigate(toComponent, {...params})}
      style={[styles.floatBtn, {
        backgroundColor: bgColor || red,
        alignSelf: alignSelf || 'flex-end',
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
    bottom: 20,
    height: 70,
    borderRadius: 100,
  }
})
