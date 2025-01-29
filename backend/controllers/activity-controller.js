const { Activity, Image, Category } = require('../models')
const handleImageUpload = require('../utils/upload-handler')
const path = require('path')

const activityController = {
  getAllActivities: async (req, res, next) => {
    try {
      const activities = await Activity.findAll({
        include: [{
          model: Image,
          as: 'images',
          attributes: ['image_url']
        }, {
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      })
      res.status(200).json(activities)
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  getActivityById: async (req, res, next) => {
    try {
      const { id } = req.params
      const activity = await Activity.findByPk(Number(id), {
        include: [{
          model: Image,
          as: 'images',
          attributes: ['image_url']
        }, {
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      })
      if (!activity) {
        return res.status(404).json({ message: '活動不存在' })
      }
      res.status(200).json(activity)
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  editActivityPage: async (req, res, next) => {
    try {
      const { activityId } = req.params
      const activity = await Activity.findByPk(Number(activityId))
      if (!activity) {
        return res.status(404).json({ message: '活動不存在' })
      }
      res.status(200).json(activity)
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  editActivity: async (req, res, next) => {
    try {
      const activityId = Number(req.params.id);
      if (isNaN(activityId)) {
        return res.status(400).json({ message: "活動 ID 無效" });
      }
      const { name, description, location, date, time, price } = req.body
      const activity = await Activity.findByPk(Number(activityId))
      if (!activity) {
        return res.status(404).json({ message: '活動不存在' })
      }
      await activity.update({ name, description, location, date, time, price })
      res.status(200).json({ message: '活動更新成功' })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  createActivityPage: async (req, res, next) => {
    try {
      res.status(200).json({ message: '這是創建活動頁面的json' })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  createActivity: async (req, res, next) => {
    try {
      const { name, description, time, price, location, category_id } = req.body

      // 確保所有必填欄位都已提供
      if (!name || !description || !time || !price || !location || !category_id) {
        return res.status(400).json({ message: '必須提供活動名稱、描述、時間、價格、地點、類別' });
      }

      // 建立活動
      const activity = await Activity.create({
        name,
        description,
        time,
        price,
        location,
        category_id,
      })

      let imageUrls = []

      const basePath = path.join(__dirname, '../uploads/activities')

      // 圖片上傳處理
      if (req.files && req.files.images) {
        const images = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images]

        imageUrls = await handleImageUpload(images, basePath, activity.id, name)

        res.status(201).json({
          message: '活動已創建',
          activity,
          images: imageUrls
        })
      }
    } catch (err) {
      console.error('活動創建失敗', err)
      res.status(500).json({ message: '活動創建失敗' })
      next(err)
    }
  },
  deleteActivity: async (req, res, next) => {
    try {
      const activityId = Number(req.params.activityId || req.params.id)
      if (isNaN(activityId)) {
        return res.status(400).json({ message: '活動 ID 無效' })
      }
      const activity = await Activity.findByPk(activityId)

      if (!activity) {
        return res.status(404).json({ message: '活動不存在' })
      }
      await activity.destroy()
      res.status(200).json({ message: '活動刪除成功' })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  }
}

module.exports = activityController