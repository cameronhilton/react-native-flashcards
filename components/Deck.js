import React, { Component } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View } from 'react-native'
import Card from './Card'

export default class Deck extends Component {
  componentDidMount() {
    const { navigation } = this.props
    
    navigation.setOptions({ title: this.props.route.params.deck.title })
  }

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
                  <Card key={qAndA.question} qAndA={qAndA}/>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})
