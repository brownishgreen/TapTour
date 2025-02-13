const { Activity, Image, Category } = require('../models')
const { handleImageUpload } = require('../utils/upload-handler')
const path = require('path')
const { Op } = require('sequelize') // 引入 Sequelize 的操作符

const activityController = {
  getAllActivities: async (req, res, next) => {
    const { search } = req.query // 從請求的查詢參數中提取 search 關鍵字

    try {
      const queryOptions = {
        include: [
          {
            model: Image,
            as: 'images',
            attributes: ['image_url'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
      }

      if (search) {
        queryOptions.where = {
          name: { [Op.like]: `%${search}%` },
        }
      }

      const activities = await Activity.findAll(queryOptions)

      if (activities.length === 0) {
        return res.status(404).json({ message: '沒有符合條件的景點' })
      }
      res.status(200).json(activities)
    } catch (err) {
      next(err)
    }
  },
  getActivityById: async (req, res, next) => {
    try {
      const { id } = req.params
      const activity = await Activity.findByPk(Number(id), {
        include: [
          {
            model: Image,
            as: 'images',
            attributes: ['image_url'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
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
      const activityId = Number(req.params.id)
      if (isNaN(activityId)) {
        return res.status(400).json({ message: '活動 ID 無效' })
      }
      const { name, description, location_id, category_id, time_duration, price } = req.body
      const activity = await Activity.findByPk(Number(activityId))
      if (!activity) {
        return res.status(404).json({ message: '活動不存在' })
      }
      await activity.update({ name, description, location_id, category_id, time_duration, price })
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
      const { name, description, time_duration, price, location_id, category_id } = req.body

      // 確保所有必填欄位都已提供
      if (!name || !description || !time_duration || !price || !location_id || !category_id) {
        return res.status(400).json({ message: '必須提供活動名稱、描述、時間、價格、地點、類別' })
      }

      // 建立活動
      const activity = await Activity.create({
        name,
        description,
        time_duration,
        price,
        location_id,
        category_id,
      })

      // 圖片上傳處理
      let imageUrls = []
      const basePath = path.join(__dirname, '../uploads/activities')

      if (req.files && req.files.images) {
        const images = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images]

          imageUrls = handleImageUpload(
            images,
            basePath,
            activity.id,
            name,
            'activities',
            'activity_id'
        )
        res.status(201).json({
          message: '活動已創建',
          activity,
          images: imageUrls,
        })
      }
    } catch (err) {
      console.error('活動創建失敗', err)
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
  },
  getPaginatedActivities: async (req, res, next) => {
    // limit 主要是由前端傳入的，但如果前端沒有傳入，後端會使用預設的值
    // 10代表十進位制，不能隨意改動
    const page = parseInt(req.query.page, 10) || 1 // 預設為第 1 頁
    const limit = parseInt(req.query.limit, 10) || 6 // 預設每頁 6 筆
    const offset = (page - 1) * limit // 計算偏移量，分頁查詢時決定從第幾筆資料開始

    // 驗證 page 和 limit 是否有效，若無效則返回 400 錯誤
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res
        .status(400)
        .json({ message: 'Page and limit must be positive numbers' })
    }

    try {
      // 獲取活動資料（包含關聯的圖片）
      const activities = await Activity.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Image,
            as: 'images',
            attributes: ['image_url'], // 僅返回圖片 URL
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
      })

      // 獲取活動的總數（不包含關聯表，避免多次計算）
      //  Sequelize 提供的方法，用於計算資料表的總記錄數
      const totalItems = await Activity.count()

      res.status(200).json({
        activities,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      })
    } catch (error) {
      console.log('分頁獲取活動數據失敗:', error)
      next(error)
    }
  },
}

module.exports = activityController
