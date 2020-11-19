import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../api/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { AddReview } from './AddReview'
import { Reviews } from './Reviews'
import { StarRating } from './StarRating'

export const RestaurantDetail = () => {
  const { id } = useParams()

  const { selectedRest, setSelectedRest } = useContext(RestaurantsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)

        setSelectedRest(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  /* FIXME double log getting restaurant detail */
  console.log(selectedRest)

  return (
    <div>
      {selectedRest && (
        <>
          <h1
            className='text-center display-1'
            style={{ textTransform: 'capitalize' }}
          >
            {selectedRest.restaurant.name}
          </h1>
          <div className='text-center'>
            <StarRating rating={selectedRest.restaurant.avg_rating} />
            <span className='text-warning ml-1'>
              {selectedRest.restaurant.count
                ? `(${selectedRest.restaurant.count})`
                : '(0)'}
            </span>
          </div>
          <div className='mt-3'>
            <Reviews reviews={selectedRest.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  )
}
