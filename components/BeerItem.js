import React, { Component } from 'react'
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Dimensions, Button, Platform, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'expo'
import FitImage from 'react-native-fit-image'

export default class BeerItem extends Component {
  handleFavoriteButtonPress = event => {
    const { beer, onPress } = this.props

    if (onPress) {
      onPress(beer)
    }
  }

  render() {
    const { beer, ImageProps, isFavorite } = this.props
    const { name, ibu, abv } = beer

    return (
      <View style={styles.container}>
        {ImageProps && (
          <Image
            {...ImageProps}
            resizeMethod="resize"
            style={styles.image}
          />
        )}
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.title}>{name}</Text>
          <View style={styles.property}>
            <Text numberOfLines={1} style={styles.propertyKey}>IBU</Text>
            <Text numberOfLines={1} style={styles.propertyValue}>{ibu}</Text>
          </View>
          <View style={styles.property}>
            <Text numberOfLines={1} style={styles.propertyKey}>ABV</Text>
            <Text numberOfLines={1} style={styles.propertyValue}>{abv}%</Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.handleFavoriteButtonPress}>
          <Icon.Ionicons
            name={
              Platform.OS === 'ios'
                ? `ios-heart`
                : 'md-heart'
            }
            size={26}
            style={styles.favoriteButton}
            color={isFavorite ? '#f05638' : '#eaeaea'}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const { width, height } = Dimensions.get('screen')

const containerWidth = width > 400 ? width / 2 - 30 : width - 40
const containerHeight = height > 700 ? height / 4 - 40 : height / 3 - 30

const styles = StyleSheet.create({
  container: {
    width: containerWidth,
    height: containerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  image: {
    width: (30 / 116) * (containerHeight - 40),
    height: containerHeight - 40,
    marginRight: 20
  },
  content: {
    flex: 3
  },
  title: {
    fontWeight: '700',
    fontSize: 20
  },
  property: {
    marginTop: 10,
    flexDirection: 'row'
  },
  propertyKey: {
    fontSize: height > 700 ? 16 : 20,
    color: '#9fa3a7',
    fontWeight: '500',
    marginRight: 'auto'
  },
  propertyValue: {
    fontSize: height > 700 ? 16 : 20,
    marginLeft: 'auto'
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})
