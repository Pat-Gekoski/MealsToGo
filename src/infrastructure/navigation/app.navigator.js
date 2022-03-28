import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Text, Button } from 'react-native'

import { theme } from '../../infrastructure/theme'
import { RestaurantNavigator } from './restaurants.navigator'
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context'
import { LocationContextProvider } from '../../services/location/location.context'
import { FavoritesContextProvider } from '../../services/favorites/favorites.context'
import { MapScreen } from '../../features/map/screens/Map.screen'
import { SafeArea } from '../../components/util/SafeArea.component'

import { AuthenticationContext } from '../../services/authentication/authentication.context'

const Tab = createBottomTabNavigator()

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
}

function SettingsScreen() {
  const { onLogout } = useContext(AuthenticationContext)
  return (
    <SafeArea>
      <Text>Settings!</Text>
      <Button title="Logout" onPress={() => onLogout()} />
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

export const AppNavigator = () => {
  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen name="Restaurants" component={RestaurantNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  )
}
