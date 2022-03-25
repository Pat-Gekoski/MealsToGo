import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'

import { RestaurantsScreen } from '../../features/restaurants/screens/Restaurants.screen'
import { RestaurantDetails } from '../../features/restaurants/screens/RestaurantDetails.screen'

const RestaurantStack = createStackNavigator()

const isAndroid = Platform === 'android'

const transition = isAndroid
  ? { ...TransitionPresets.BottomSheetAndroid }
  : { ...TransitionPresets.ModalSlideFromBottomIOS }

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...transition,
      }}
    >
      <RestaurantStack.Screen
        name="RestaurantsStack"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="Restaurant Detail"
        component={RestaurantDetails}
      />
    </RestaurantStack.Navigator>
  )
}
