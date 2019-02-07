import React from 'react'
import { Image, Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    logo: {
        marginLeft: Platform.OS === 'android' ? 20 : 0
    }
})

const Logo = () => <Image style={styles.logo} source={require('../assets/images/logo.png')} />

export default Logo
