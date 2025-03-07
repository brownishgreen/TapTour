import express from 'express'
import userRoutes from './user.js'
import adminRoutes from './admin.js'
import activityRoutes from './activity.js'
import productRoutes from './product.js'
import followerRoutes from './follower.js'
import LocationRoutes from './location.js'
import categoryRoutes from './category.js'
import commentRoutes from './comment.js'
import orderRoutes from './orders.js'
import favoriteRoutes from './favorite.js'
import passport from '../config/passport.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// 掛載路由模組
router.use('/users', userRoutes) // route for users
router.use('/admin', adminRoutes) // route for admin
router.use('/activities', activityRoutes) // route for activities
router.use('/products', productRoutes) // route for products
router.use('/followers', followerRoutes) // route for followers
router.use('/locations', LocationRoutes) // route for locations
router.use('/categories', categoryRoutes) // route for categories
router.use('/comments', commentRoutes) // route for comments
router.use('/orders', orderRoutes) // route for orders
router.use('/favorites', favoriteRoutes) // route for favorites


// create a route to upload images
router.post('/upload', async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: '請提供圖片' })
  }

  try {
    const imageUrls = await handleImageUpload(
      req.files.image,
      req.body.entityId,
      req.body.name,
      req.body.entityType,
      req.body.dbColumn
    )
    res.json({ urls: imageUrls })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


export default router
