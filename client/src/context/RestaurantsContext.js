import React, { useState, createContext } from 'react'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRest, setSelectedRest] = useState(null)

  const addRestaurant = restaurant => {
    setRestaurants([...restaurants, restaurant])
  }
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        selectedRest,
        setSelectedRest
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  )
}
