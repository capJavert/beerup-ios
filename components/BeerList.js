import React, { Component } from 'react'
import { AppRegistry, FlatList, StyleSheet, Text, View, Dimensions } from 'react-native'

import BeerItem from './BeerItem'
import FavoriteService from '../services/FavoriteService'

export default class BeerList extends Component {
  getKeyForItem = (item, index) => item.id.toString()

  handleFavoriteButtonPress = beer => {
    const { onFavorite } = this.props

    if (FavoriteService.isFavorite(beer)) {
      FavoriteService.unfavorite(beer)
    } else {
      FavoriteService.favorite(beer)
    }

    if (onFavorite) {
      onFavorite()
    }
  }

  render() {
    const { beers, ListProps } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          {...ListProps}
          style={styles.list}
          numColumns={Dimensions.get('screen').width > 400 ? 2 : 1}
          keyExtractor={this.getKeyForItem}
          data={beers || []}
          renderItem={({ item }) => (
            <BeerItem
              beer={item}
              onPress={this.handleFavoriteButtonPress}
              isFavorite={FavoriteService.isFavorite(item)}
              ImageProps={{
                source: {
                  uri: item.image_url
                }
              }}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f7f7f7',
   paddingBottom: 20
 },
 list: {
   padding: 10,
 }
})
