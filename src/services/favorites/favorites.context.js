import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const FavoritesContext = createContext()

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const saveFavorites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@favorites', jsonValue)
    } catch (error) {
      console.log(error)
    }
  }

  const loadFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('@favorites')
      if (value !== null) {
        setFavorites(JSON.parse(value))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const add = (restaurant) => {
    setFavorites([...favorites, restaurant])
  }

  const remove = (restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    )

    setFavorites(newFavorites)
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
