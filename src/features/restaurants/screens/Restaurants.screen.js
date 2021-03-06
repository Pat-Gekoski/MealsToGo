import React, { useContext, useState } from 'react'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { SafeArea } from '../../../components/util/SafeArea.component'
import { Spacer } from '../../../components/spacer/Spacer.component'
import { Text } from '../../../components/typography/Text.component'
import { FadeInView } from '../../../components/animations/fade.animation'
import { FavoritesBar } from '../../../components/favorite/FavoritesBar.component'
import { RestaurantInfoCard } from '../components/RestaurantInfoCard.component'
import { Search } from '../components/Search.component'
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context'
import { LocationContext } from '../../../services/location/location.context'
import { FavoritesContext } from '../../../services/favorites/favorites.context'

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`

export const RestaurantsScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext)
  const { restaurants, isLoading, error } = useContext(RestaurantsContext)
  const { favorites } = useContext(FavoritesContext)
  const [isToggled, setIsToggled] = useState(false)
  const hasError = !!error || !!locationError

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavoritesToggled={isToggled}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavoritesBar favourites={favorites} onNavigate={navigation.navigate} />
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!hasError && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.placeId}
              onPress={() =>
                navigation.navigate('Restaurant Detail', { restaurant: item })
              }
            >
              <FadeInView>
                <Spacer position="bottom" size="large">
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </FadeInView>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  )
}

export default RestaurantsScreen
