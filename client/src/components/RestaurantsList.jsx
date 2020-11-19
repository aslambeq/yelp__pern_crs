import React, { useContext, useEffect } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from 'react-router-dom'
import { StarRating } from './StarRating'

export const RestaurantsList = props => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/')
        setRestaurants(response.data.data.restaurants)
      } catch (err) {}
    }

    fetchData()
  }, [])

  const handleDelete = async (e, id) => {
    try {
      e.stopPropagation()
      await RestaurantFinder.delete(`/${id}`)
      setRestaurants(
        restaurants.filter(r => {
          return r.id !== id
        })
      )
    } catch (err) {
      console.log(err) // FIXME
    }
  }

  const handleUpdate = async (e, id) => {
    try {
      e.stopPropagation()
      history.push(`/restaurants/${id}/update`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRestaurantSelect = id => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = restaurant => {
    if (!restaurant.count) {
      return <span className='text-warning'>0 reviews</span>
    }
    return (
      <>
      {/* TODO rating = restaurant.id ??? */}
        <StarRating rating={restaurant.avg_rating} />

        <span className='text-warning ml-1'>({restaurant.count})</span>
      </>
    )
  }

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>

        <tbody>
          {restaurants &&
            restaurants.map(r => {
              // TODO proper r.name capitalize with uppperCase abbreviations (like KFC)
              return (
                <tr onClick={() => handleRestaurantSelect(r.id)} key={r.id}>
                  <td style={{ textTransform: 'capitalize' }}>{r.name}</td>
                  <td style={{ textTransform: 'capitalize' }}>{r.location}</td>
                  <td>{'$'.repeat(r.price_range)}</td>
                  <td>{renderRating(r)}</td>
                  <td>
                    <button
                      onClick={e => handleUpdate(e, r.id)}
                      className='btn btn-warning'
                    >
                      update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={e => handleDelete(e, r.id)}
                      className='btn btn-danger'
                    >
                      delete
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
