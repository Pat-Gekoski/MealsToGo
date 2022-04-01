import { Platform } from 'react-native'

const liveHost = 'https://us-central1-mealstogo-9bfe5.cloudfunctions.net'
const localHost = 'http://localhost:5001/mealstogo-9bfe5/us-central1'

const isAndroid = Platform.OS === 'android'
const isDevelopment = process.env.NODE_ENV === 'development'
export const isMock = true
export const host = !isDevelopment || isAndroid ? liveHost : localHost

/** Testing on Android....Android can only make requests to https and not http protocols.
 * As a result, you will only be able to test Android against the livehost since firebase's local
 * development can't run in https mode. This is a shortcoming of firebase.
 */
