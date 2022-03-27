import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Spacer } from '../spacer/Spacer.component'
import { CompactRestaurantInfo } from '../restaurant/CompactRestaurantInfo.component'
import { Text } from '../typography/Text.component'

const FavouritesWrapper = styled.View`
  margin-bottom: 10px;
`
const FavortiesScrollView = styled(ScrollView).attrs({
  contentContainerStyle: { marginHorizontal: 20 },
})``

export const FavoritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null
  }
  return (
    <FavouritesWrapper>
      <Spacer position="left" size="large">
        <Text variant="caption">Favorites</Text>
      </Spacer>

      <FavortiesScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          const key = restaurant.name
          return (
            <Spacer key={key} position="right" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate('RestaurantDetail', {
                    restaurant,
                  })
                }
              >
                <CompactRestaurantInfo
                  restaurant={restaurant}
                  textProps={{
                    numberOfLines: 1,
                    ellipsizeMode: 'tail',
                  }}
                />
              </TouchableOpacity>
            </Spacer>
          )
        })}
      </FavortiesScrollView>
    </FavouritesWrapper>
  )
}
