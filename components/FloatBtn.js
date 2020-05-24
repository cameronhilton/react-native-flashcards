import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { red, white } from '../utils/colors'

export default function FloatBtn({ navigation, params, toComponent }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(toComponent, {...params})}
      style={styles.floatBtn}
    >
      <FontAwesome name='plus' size={40} color={white} />
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
    right: 10,
    height: 70,
    backgroundColor: red,
    borderRadius: 100,
  }
})
