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

const router = express.Router()

// 掛載路由模組
router.use('/users', userRoutes) // 路徑 /api/users
router.use('/admin', adminRoutes) // 路徑 /api/admin
router.use('/activities', activityRoutes) // 路徑 /api/activities
router.use('/products', productRoutes) // 路徑 /api/products
router.use('/followers', followerRoutes) // 路徑 /api/followers
router.use('/locations', LocationRoutes) // 路徑 /api/locations
router.use('/categories', categoryRoutes) // 路徑 /api/categories
router.use('/comments', commentRoutes) // 路徑 /api/comments
router.use('/orders', orderRoutes) // 路徑 /api/orders
router.use('/favorites', favoriteRoutes) // 路徑 /api/favorites

// 📌 新增上傳圖片 API
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
