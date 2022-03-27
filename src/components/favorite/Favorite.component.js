import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

import { FavoritesContext } from '../../services/favorites/favorites.context'

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 9;
`
const IconWrapper = styled.View`
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
`

export const Favorite = ({ restaurant }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext)

  const isFavorite = favorites.find((r) => r.placeId === restaurant.placeId)

  return (
    <FavoriteButton
      onPress={() => {
        !isFavorite
          ? addToFavorites(restaurant)
          : removeFromFavorites(restaurant)
      }}
    >
      <IconWrapper>
        <AntDesign
          name={isFavorite ? 'heart' : 'hearto'}
          size={24}
          color={isFavorite ? 'red' : 'white'}
        />
      </IconWrapper>
    </FavoriteButton>
  )
}
