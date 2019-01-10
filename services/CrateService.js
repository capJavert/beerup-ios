import * as firebase from 'firebase'
import StorageService from './StorageService'
import ConditionsUtil from '../helpers/ConditionsUtil'

class CrateService extends StorageService {
    get storageKey() {
        return 'beerup-crate'
    }

    /**
     * Load current crate into memory from local storage
     *
     * @return {number[]}
     */
    get crates() {
        if (this.isStorageAvailable) {
            return JSON.parse(localStorage.getItem(this.storageKey))
        }
        return []
    }

    /**
     * Set current crate to local storage
     * @param {number[]} value
     */
    set crates(value) {
        if (this.isStorageAvailable) {
            localStorage.setItem(this.storageKey, JSON.stringify(value))
            this.changeEvent.$emit('crates-changed', true)

            if (firebase.auth().currentUser) {
                const userId = firebase.auth().currentUser.uid
                firebase
                    .database()
                    .ref(`users/${userId}/${this.storageKey}`)
                    .set(value)
            }
        }
    }

    constructor() {
        super()

        if (this.isStorageAvailable) {
            if (ConditionsUtil.isNull(this.crates)) {
                // if no favorites stored init storage
                localStorage.setItem(this.storageKey, JSON.stringify([[], [], []]))
            }
        }
    }

    addBeerToCrate(beerSrc, crateIndex) {
        const { crates } = this
        crates[crateIndex].push(beerSrc)

        this.crates = crates
    }
}

const crateService = new CrateService()
export default crateService
