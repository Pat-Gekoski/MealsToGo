import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

import { FavoritesContext } from '../../../services/favorites/favorites.context'
import { SafeArea } from '../../../components/util/SafeArea.component'
import { Text } from '../../../components/typography/Text.component'
import { Spacer } from '../../../components/spacer/Spacer.component'
import { RestaurantList } from '../../restaurants/components/restaurantList.styles'
import { RestaurantInfoCard } from '../../restaurants/components/RestaurantInfoCard.component'

const NoFavoritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`
export const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext)

  return favorites.length ? (
    <SafeArea>
      <RestaurantList
        data={favorites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Restaurant Detail', {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavoritesArea>
      <Text center>No favorites yet</Text>
    </NoFavoritesArea>
  )
}
