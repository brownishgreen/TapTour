import multerConfig from '../utils/multer-config.js'
import { Activity, Image, Category } from '../models/index.js'
import { Op } from 'sequelize'
import CustomError from '../utils/CustomError.js'

const { uploadToGCS } = multerConfig

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
  updateActivity: async (activityId, value) => {
    try {
      if (isNaN(activityId)) {
        throw new CustomError(400, '活動 ID 無效')
      }
      const activity = await Activity.findByPk(Number(activityId))
      if (!activity) {
        throw new CustomError(404, '活動不存在')
      }
      await activity.update(value)
      return { message: '活動更新成功' }
    } catch (err) {
      console.error('活動更新失敗:', err)
      throw new CustomError(500, '伺服器錯誤，活動更新失敗')
    }
  },
  createActivity: async (activityData, files) => {
    try {

      // 創建活動
      const activity = await Activity.create({
        name: activityData.name,
        description: activityData.description,
        time_duration: activityData.time_duration,
        price: activityData.price,
        location_id: activityData.location_id,
        category_id: activityData.category_id,
      })

      if (!activity) {
        throw new CustomError(500, '活動創建失敗')
      }

      // 圖片上傳處理
      let imageUrls = []

      if (files && files.length > 0) {
        imageUrls = await Promise.all(
          files.map(file => uploadToGCS(file, 'activities', activity.id))
        )
      }

      // 創建圖片
      await Promise.all(
        imageUrls.map(url => Image.create({ image_url: url, activity_id: activity.id }))
      )

      return { message: '活動已創建', activity, images: imageUrls }
    } catch (err) {
      console.error('活動創建失敗:', err)
      throw new CustomError(500, '伺服器錯誤，活動創建失敗')
    }
  },

  deleteActivity: async (activityId) => {
    try {
      const activityIdNumber = Number(activityId)

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

  getPaginatedActivities: async (page, limit, offset) => {
    try {
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
        currentPage: page,
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