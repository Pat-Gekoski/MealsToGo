import React from 'react'
import { SettingsScreen } from '../../features/settings/screens/Settings.screen'
import { FavoritesScreen } from '../../features/settings/screens/Favorites.screen'

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'

const SettingsStack = createStackNavigator()

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
          title: 'Favorites',
        }}
        name="Settings Stack"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favorites" component={FavoritesScreen} />
    </SettingsStack.Navigator>
  )
}
