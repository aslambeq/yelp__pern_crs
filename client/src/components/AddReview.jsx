import React, { useState } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { useHistory, useLocation, useParams } from 'react-router-dom'

export const AddReview = () => {
  const { id } = useParams()

  const location = useLocation()

  const history = useHistory()

  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [reviewText, setReviewText] = useState('')

  const handleSubmitReview = async e => {
    e.preventDefault()
    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        rating,
        review: reviewText
      })

      // FIXME fix refresh
      history.push('/')
      history.push(location.pathname)
    } catch (err) {}
  }

  return (
    <div className='mb-2'>
      <form action=''>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              id='name'
              placeholder='name'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              value={rating}
              onChange={e => setRating(e.target.value)}
              id='rating'
              className='custom-select'
            >
              <option value='' disabled hidden>
                rating
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-gro'>
          <label htmlFor='review'>Review</label>
          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            id='review'
            className='form-control'
          ></textarea>
        </div>
        <button
          type='submit'
          onClick={handleSubmitReview}
          className='btn btn-primary'
        >
          submit
        </button>
      </form>
    </div>
  )
}
