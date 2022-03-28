import React, { useEffect, useState } from 'react'
import { LogBox } from 'react-native'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components/native'
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald'
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato'

import { initializeApp, getApps } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { Navigation } from './src/infrastructure/navigation'
import { theme } from './src/infrastructure/theme'
import { RestaurantsContextProvider } from './src/services/restaurants/restaurants.context'
import { LocationContextProvider } from './src/services/location/location.context'
import { FavoritesContextProvider } from './src/services/favorites/favorites.context'
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context'

export default function App() {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native'])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const firebaseConfig = {
    apiKey: 'AIzaSyCGa3TpM1IoCIFpJjFtQXKKu9-jInzxvs4',
    authDomain: 'mealstogo-9bfe5.firebaseapp.com',
    projectId: 'mealstogo-9bfe5',
    storageBucket: 'mealstogo-9bfe5.appspot.com',
    messagingSenderId: '307132062271',
    appId: '1:307132062271:web:65f9e98096dd1aa594f68a',
  }

  let app
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  }

  // useEffect(() => {
  //   const auth = getAuth(app)
  //   signInWithEmailAndPassword(auth, 'patgekoski@gmail.com', 'password')
  //     .then(({ user }) => {
  //       setIsAuthenticated(true)
  //     })
  //     .catch((err) => console.log('ERROR: ', err))
  // }, [app])

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  })

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold,
  })

  if (!oswaldLoaded || !latoLoaded) {
    return null
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavoritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavoritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  )
}
