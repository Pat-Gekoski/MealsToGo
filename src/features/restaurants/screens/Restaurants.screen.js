import React, { useContext } from 'react'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

import { SafeArea } from '../../../components/util/Safe-area.component'
import { Spacer } from '../../../components/spacer/Spacer.component'
import { RestaurantInfoCard } from '../components/Restaurant-info-card.component'
import { Search } from '../components/Search.component'
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context'

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

export const RestaurantsScreen = () => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext)

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search />
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="large" key={item.placeId}>
            <RestaurantInfoCard restaurant={item} />
          </Spacer>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  )
}

export default RestaurantsScreen
