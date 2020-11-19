import React from 'react'
import { AddRestaurant } from '../components/AddRestaurant'
import { Header } from '../components/Header'
import { RestaurantsList } from '../components/RestaurantsList'

export const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantsList />
    </div>
  )
}
