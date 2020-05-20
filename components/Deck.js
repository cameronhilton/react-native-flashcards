import React, { Component } from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native'
import { darkBlue, white } from '../utils/colors'

export default class Deck extends Component {
  render() {
    const { deck } = this.props.route.params

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView >
          {deck.questions.length === 0
            ? <View style={styles.center}>
                <Text>No cards created yet</Text>
              </View>
            : deck.questions.map((qAndA) => {
                return (
                  <TouchableOpacity key={qAndA.question} onPress={() => ({})}>
                    <View style={styles.card}>
                      <Text>{qAndA.question}</Text>
                      <Text>{qAndA.answer}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    borderColor: darkBlue,
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    marginTop: 10,
    marginBottom: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    color: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})
