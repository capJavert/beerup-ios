import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { Icon } from 'expo'

import { navigationOptions } from '../navigation/options'
import FavoriteService from '../services/FavoriteService'
import BeerList from '../components/BeerList'

const EmptyIcon = () => (
  <Icon.Ionicons
    name={
      Platform.OS === 'ios'
        ? `ios-heart-empty`
        : 'md-heart-empty'
    }
    size={220}
    style={styles.emptyIcon}
  />
)

export default class FavoritesScreen extends React.Component {
  static navigationOptions = {
    ...navigationOptions
  }
  state = {
    beers: []
  }

  getFavorites = () => {
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
  }

  render = () => {
    const { beers } = this.state

    return !!beers.length ? (
      <BeerList
        beers={beers}
        onFavorite={this.handleFavorite}
        ListProps={{
          onEndReachedThreshold: 0.15,
          onEndReached: this.handleEndReached,
          onScrollBeginDrag: this.handleScrollBeginDrag
        }}
      />
    ) : (
      <View style={styles.empty}>
        <EmptyIcon />
        <Text style={styles.text}>No favorites yet. You can pick some in the Home screen.</Text>
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
