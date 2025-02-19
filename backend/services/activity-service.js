import { Activity, Image, Category } from '../models/index.js'
import { handleImageUpload } from '../utils/upload-handler.js'
import { Op } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'
import CustomError from '../utils/CustomError.js'

const activityService = {
  getAllActivities: async (search) => {
    const queryOptions = {
      include: [
        { model: Image, as: 'images', attributes: ['image_url'] },
        { model: Category, as: 'category', attributes: ['name'] },
      ],
    }
    if (search) {
      queryOptions.where = { name: { [Op.like]: `%${search}%` } }
    }

    try {
      const activities = await Activity.findAll(queryOptions)
      if (!activities.length) {
        throw new CustomError(404, '沒有符合條件的活動')
      }
      return activities
    } catch (err) {
      console.error('獲取活動失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法獲取活動資料')
    }
  },

  getActivityById: async (id) => {
    try {
      const activity = Activity.findByPk(id, {
        include: [
          { model: Image, as: 'images', attributes: ['image_url'] },
          { model: Category, as: 'category', attributes: ['name'] },
        ],
      })

      if (!activity) {
        throw new CustomError(404, '活動不存在')
      }
      return activity
    } catch (err) {
      console.error('獲取活動詳情失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法獲取活動詳情')
    }
  },

  editActivityPage: async (id) => {
    try {
      const activity = await Activity.findByPk(id)
      if (!activity) {
        throw new CustomError(404, '活動不存在')
      }
      return activity
    } catch (err) {
      console.error('獲取活動編輯頁面失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法獲取活動編輯頁面')
    }
  },
  updateActivity: async (
    id,
    { name, description, location_id, category_id, time_duration, price }
  ) => {
    try {
      const activity = await Activity.findByPk(id)
      if (!activity) throw new CustomError(404, '活動不存在')
      await activity.update({
        name,
        description,
        location_id,
        category_id,
        time_duration,
        price,
      })
      return { message: '活動更新成功' }
    } catch (err) {
      console.error('活動更新失敗:', err)
      throw new CustomError(500, '伺服器錯誤，活動更新失敗')
    }
  },
  createActivity: async (data, files) => {
    try {
      const {
        name,
        description,
        time_duration,
        price,
        location_id,
        category_id,
      } = data

      // 確保所有必填欄位都有提供
      if (
        !name ||
        !description ||
        !time_duration ||
        !price ||
        !location_id ||
        !category_id
      ) {
        throw new CustomError(
          400,
          '必須提供活動名稱、描述、時間、價格、地點、類別'
        )
      }

      // 創建活動
      const activity = await Activity.create({
        name,
        description,
        time_duration,
        price,
        location_id,
        category_id,
      })

      if (!activity) {
        throw new CustomError(500, '活動創建失敗')
      }

      // 圖片上傳處理
      let imageUrls = []
      const basePath = path.join(__dirname, '../uploads/activities')

      if (files && files.images) {
        const images = Array.isArray(files.images)
          ? files.images
          : [files.images]

        imageUrls = handleImageUpload(
          images,
          basePath,
          activity.id,
          name,
          'activities',
          'activity_id'
        )
      }

      return { message: '活動已創建', activity, images: imageUrls }
    } catch (err) {
      console.error('活動創建失敗:', err)
      throw new CustomError(500, '伺服器錯誤，活動創建失敗')
    }
  },

  deleteActivity: async (id) => {
    try {
      const activityIdNumber = Number(id)

      if (isNaN(activityIdNumber)) {
        throw new CustomError(400, '活動 ID 無效')
      }

      const activity = await Activity.findByPk(activityIdNumber)

      if (!activity) {
        throw new CustomError(404, '活動不存在')
      }

      await activity.destroy()
      return { message: '活動刪除成功' }
    } catch (err) {
      console.error('活動刪除失敗:', err)
      throw new CustomError(500, '伺服器錯誤，活動刪除失敗')
    }
  },

  getPaginatedActivities: async (page, limit) => {
    try {
      // 驗證 page 和 limit 是否有效
      if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        throw new CustomError(400, 'Page and limit must be positive numbers')
      }

      const offset = (page - 1) * limit // 計算偏移量，分頁查詢時決定從第幾筆資料開始

      const activities = await Activity.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          { model: Image, as: 'images', attributes: ['image_url'] },
          { model: Category, as: 'category', attributes: ['name'] },
        ],
      })
      const totalItems = await Activity.count()
      return {
        activities,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      }
    } catch (err) {
      console.error('分頁獲取活動數據失敗:', err)
      throw new CustomError(500, '伺服器錯誤，無法獲取活動列表')
    }
  },
}

export default activityService
