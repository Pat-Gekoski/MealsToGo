import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'react-native'

import { theme } from '../../infrastructure/theme'
import { RestaurantNavigator } from './restaurants.navigator'
import { SafeArea } from '../../components/util/SafeArea.component'

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

export const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Restaurants" component={RestaurantNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
