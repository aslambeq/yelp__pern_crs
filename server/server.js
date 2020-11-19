require('dotenv').config()
const express = require('express')
const db = require('./db')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))

app.use(cors())
app.use(express.json())

/* GET all restaurants */
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    // const result = await db.query('SELECT * FROM restaurants')
    const restaurantRatingData = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id'
    )

    console.log('restRatingData: ', restaurantRatingData)

    res.status(200).json({
      status: 'success',
      results: restaurantRatingData['rowCount'],
      data: {
        restaurants: restaurantRatingData['rows']
      }
    })
  } catch (err) {
    res.status(500).send(`${err}`)
  }
})

/* get indivindual restaurant by id */
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    // const restaurant = await db.query(
    //   'SELECT * FROM restaurants WHERE id = $1',
    //   [req.params.id]
    // )
    const restaurant = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
      [req.params.id]
    )

    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id = $1',
      [req.params.id]
    )

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    })
  } catch (err) {
    res.status(500).send(`${err}`)
  }
})

/* create restaurant */
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const result = await db.query(
      'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *',
      [req.body.name, req.body.location, req.body.price_range]
    )

    console.log(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: result.rows[0]
      }
    })
  } catch (err) {
    res.status(500).send(`${err}`)
  }
})

/* update restaurant by id */
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    )

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: result.rows[0]
      }
    })
  } catch (err) {
    res.status(500).send(`${err}`)
  }
})

/* delete restaurant by id */
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id])
    res.status(204).json({
      status: 'success'
    })
  } catch (err) {
    res.status(500).send(`${err}`)
  }
})

/* add review by restaurant id */
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const newReview = await db.query(
      'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *',
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    )
    res.status(201).json({
      status: 'succes',
      data: {
        review: newReview.rows[0]
      }
    })
  } catch (err) {
    res.json({ meesage: err }) // FIXME test
  }
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
