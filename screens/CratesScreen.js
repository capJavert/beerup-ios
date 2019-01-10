import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { Icon } from 'expo'

import { navigationOptions } from '../navigation/options'
// import FavoriteService from '../services/FavoriteService'
import BeerList from '../components/BeerList'

const EmptyIcon = () => (
  <Icon.Ionicons
    name={
      Platform.OS === 'ios'
        ? `ios-filing`
        : 'md-filing'
    }
    size={220}
    style={styles.emptyIcon}
  />
)

export default class CratesScreen extends React.Component {
  static navigationOptions = {
    ...navigationOptions
  }
  state = {
    crates: []
  }

  /* getFavorites = () => {
    FavoriteService.getFavorites().then(beers => {
      this.setState({ beers })
    })
  }

  componentDidMount = () => {
    const { navigation } = this.props

    navigation.addListener('didFocus', this.componentDidFocus)
  }

  componentDidFocus = () => {
    this.getFavorites()
  }

  handleFavorite = () => {
    this.getFavorites()
  } */

  render = () => {
    const { crates } = this.state

    return !!crates.length ? (
      {/* TODO Crate list */}
    ) : (
      <View style={styles.empty}>
        <EmptyIcon />
        <Text style={styles.text}>No beers in crates yet! You can place some by selecting beer.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  empty: {
    height: '100%',
    justifyContent: 'center'
  },
  emptyIcon: {
    textAlign: 'center',
    color: '#d4d6d8'
  },
  text: {
    color: '#9fa3a7',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    padding: 20,
    marginTop: 10
  }
})
