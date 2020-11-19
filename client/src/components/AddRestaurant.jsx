import React, { useContext, useState } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

export const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.post('/', {
        name,
        location,
        price_range: priceRange
      })
      addRestaurant(response.data.data.restaurant)
      console.log(response)
    } catch (err) {}
  }

  return (
    <div className='mb-4'>
      <form action=''>
        <div className='form-row'>
          <div className='col'>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='restaurant'
              type='text'
              className='form-control'
            />
          </div>
          <div className='col'>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder='location'
              type='text'
              className='form-control'
            />
          </div>
          <div className='col'>
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className='custom-select my-1 mr-sm-2'
            >
              <option value='' disabled hidden>
                price range
              </option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn btn-primary'
          >
            add
          </button>
          {/* TODO reset(clear) form on submit */}
        </div>
      </form>
    </div>
  )
}
