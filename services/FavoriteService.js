// import * as firebase from 'firebase'
import { AsyncStorage } from 'react-native'

import StorageService from './StorageService'
import ConditionsUtil from '../helpers/ConditionsUtil'

class FavoriteService extends StorageService {
    favoritesCache = []

    get storageKey() {
      return 'beerup-favorites'
    }

    /**
     * Load current favorites into memory from local storage
     */
    async getFavorites(callback) {
      if (this.isStorageAvailable) {
        return JSON.parse(await AsyncStorage.getItem(this.storageKey))
      }

      return []
    }

    /**
     * Set current favorites to local storage
     */
    async setFavorites(value) {
      this.favoritesCache = value

      if (this.isStorageAvailable) {
        return AsyncStorage.setItem(this.storageKey, JSON.stringify(value))

        /* if (firebase.auth().currentUser) {
            const userId = firebase.auth().currentUser.uid
            firebase
                .database()
                .ref(`users/${userId}/${this.storageKey}`)
                .set(value)
        } */
      }

      return false
    }

    constructor() {
        super()

        if (this.isStorageAvailable) {
          if (ConditionsUtil.isNull(this.favorites)) {
            // if no favorites stored init storage
            AsyncStorage.setItem(this.storageKey, JSON.stringify([]))
          } else {
            this.getFavorites().then(favorites => {
              this.favoritesCache = favorites
            })
          }
        }
    }

    async favorite(beer) {
      this.favoritesCache.push(beer)
      this.setFavorites(this.favoritesCache)
    }

    async unfavorite(beer) {
      const model = this.favoritesCache.find(obj => beer.id === obj.id)
      const index = this.favoritesCache.indexOf(model)

      if (index > -1) {
        this.favoritesCache.splice(index, 1)
        this.setFavorites(this.favoritesCache)
      }
    }

    isFavorite(beer) {
      return !!this.favoritesCache.find(obj => beer.id === obj.id)
    }
}

const favoriteService = new FavoriteService()
export default favoriteService
