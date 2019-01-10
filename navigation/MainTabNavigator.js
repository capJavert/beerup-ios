import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import CratesScreen from '../screens/CratesScreen'

const tabBarOptions = {
  activeTintColor: 'black',
  inactiveTintColor: 'black',
  style: {
    backgroundColor: '#FFC80A'
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarOptions,
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
}

const FavoritesStack = createStackNavigator({
  Favorites: FavoritesScreen,
})

FavoritesStack.navigationOptions = {
  tabBarOptions,
  tabBarLabel: 'Favorites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
}

const CratesStack = createStackNavigator({
  Crates: CratesScreen,
})

CratesStack.navigationOptions = {
  tabBarOptions,
  tabBarLabel: 'Crates',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
    />
  ),
}

export default createBottomTabNavigator({
  HomeStack,
  FavoritesStack,
  CratesStack,
})
