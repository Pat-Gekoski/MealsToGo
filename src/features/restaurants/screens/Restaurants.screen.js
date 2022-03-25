import React, { useContext } from 'react'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { SafeArea } from '../../../components/util/SafeArea.component'
import { Spacer } from '../../../components/spacer/Spacer.component'
import { RestaurantInfoCard } from '../components/RestaurantInfoCard.component'
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

export const RestaurantsScreen = ({ navigation }) => {
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
          <TouchableOpacity
            key={item.placeId}
            onPress={() =>
              navigation.navigate('Restaurant Detail', { restaurant: item })
            }
          >
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  )
}

export default RestaurantsScreen
