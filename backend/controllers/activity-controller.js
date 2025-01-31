const { Activity, Image, Category } = require('../models')
const {handleImageUpload} = require('../utils/upload-handler')
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
      next(err)
    }
  },
  createActivityPage: async (req, res, next) => {
    try {
      res.status(200).json({ message: '這是創建活動頁面的json' })
    } catch (err) {
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


      // 圖片上傳處理
      let imageUrls = []
      const basePath = path.join(__dirname, '../uploads/activities')

      if (req.files && req.files.images) {
        const images = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images]
        
        try {
          imageUrls = await handleImageUpload(images, basePath, activity.id, name, 'activities', 'activity_id') 
          // 這裡的 'activity.id' 是活動的 ID用來產生目錄和檔名，'activities' 是實體類型，'activity_id' 是資料庫中對應的外鍵欄位名
        } catch (err) {
          console.error('圖片上傳失敗', err)
          return next(err)
        }

        res.status(201).json({
          message: '活動已創建',
          activity,
          images: imageUrls
        })
      }
    } catch (err) {
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
      next(err)
    }
  }
}

module.exports = activityController