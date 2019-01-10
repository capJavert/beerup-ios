import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  StatusBar
} from 'react-native'

import { navigationOptions } from '../navigation/options'
import BeerList from '../components/BeerList'
import BeerService from '../services/BeerService'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    ...navigationOptions
  }

  state = {
    beers: [],
    per_page: 16,
    page: 1,
    lastUpdate: 0
  }
  scrolledSinceFetch = false

  handleScrollBeginDrag = () => {
    this.scrolledSinceFetch = true
  }

  handleEndReached = ({ distanceFromEnd }) => {
    if (!this.scrolledSinceFetch) {
      return
    }

    const { beers, page, per_page } = this.state
    const newPage = page + 1
    this.setState({ page: newPage })

    this.scrolledSinceFetch = false

    BeerService.list({ page: newPage, per_page })
      .then(data => {
        this.setState({
          beers: [
            ...beers,
            ...data
          ]
        })
    })
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const { page, per_page } = this.state

    navigation.addListener('didFocus', this.componentDidFocus)

    BeerService.list({ page, per_page })
      .then(data => {
        this.setState({ beers: data })
    })
  }

  componentDidFocus = payload => {
    this.setState({ lastUpdate: new Date().getTime() })
  }

  handleFavorite = () => {
    this.setState({ lastUpdate: new Date().getTime() })
  }

  render() {
    const { beers, lastUpdate } = this.state

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <BeerList
          beers={beers}
          onFavorite={this.handleFavorite}
          ListProps={{
            lastUpdate,
            onEndReachedThreshold: 0.15,
            onEndReached: this.handleEndReached,
            onScrollBeginDrag: this.handleScrollBeginDrag
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})
