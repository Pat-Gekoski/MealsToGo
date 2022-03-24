import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import React from 'react'
import { Text } from 'react-native'
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
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import { SafeArea } from './src/components/util/Safe-area.component'
import { theme } from './src/infrastructure/theme'
import { RestaurantsScreen } from './src/features/restaurants/screens/Restaurants.screen'
import { RestaurantsContextProvider } from './src/services/restaurants/restaurants.context'
import { LocationContextProvider } from './src/services/location/location.context'

const Tab = createBottomTabNavigator()

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
}

function SettingsScreen() {
  return (
    <SafeArea>
      <Text>Settings!</Text>
    </SafeArea>
  )
}

function MapScreen() {
  return (
    <SafeArea>
      <Text>Map!</Text>
    </SafeArea>
  )
}

const tabScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name]
  return {
    headerShown: false,
    tabBarIcon: ({ color, size }) => {
      return <Ionicons name={iconName} size={size} color={color} />
    },
    tabBarActiveTintColor: theme.colors.ui.error,
    tabBarInactiveTintColor: theme.colors.ui.secondary,
  }
}

export default function App() {
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
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <NavigationContainer>
              <Tab.Navigator screenOptions={tabScreenOptions}>
                <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  )
}
