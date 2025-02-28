
import { activitySchema } from '../validations/activity-validation.js'
import activityService from '../services/activity-service.js'

const activityController = {
  getAllActivities: async (req, res, next) => {
    const { search } = req.query // 從請求的查詢參數中提取 search 關鍵字
    const activities = await activityService.getAllActivities(search)
    res.status(200).json(activities)
  },
  getActivityById: async (req, res, next) => {
    try {
      const { id } = req.params
      const activity = await activityService.getActivityById(id)
      res.status(200).json(activity)
    } catch (err) {
      next(err)
    }
  },
  editActivityPage: async (req, res, next) => {
    try {
      const activityId = Number(req.params.id)
      if (isNaN(activityId)) {
        return res.status(400).json({ message: '活動 ID 無效' })
      }
      const activity = await activityService.editActivityPage(activityId)
      res.status(200).json(activity)
    } catch (err) {
      next(err)
    }
  },
  editActivity: async (req, res, next) => {
    const activityId = Number(req.params.id)
    if (isNaN(activityId)) {
      return res.status(400).json({ message: '活動 ID 無效' })
    }
    // 驗證活動資料
    const { error, value } = activitySchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    // 查詢活動
    const activity = await activityService.updateActivity(activityId, value)
    res.status(200).json({ message: '活動更新成功' })
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
      // 驗證活動資料
      const activityData = req.body
      const files = req.files
      if (error) {
        return res.status(400).json({ message: error.details[0].message })
      }
      // 建立活動
      const activity = await activityService.createActivity(activityData, files)

      res.status(201).json({ message: '活動已創建', activity })
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
      await activityService.deleteActivity(activityId)
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
    // 驗證 page 和 limit 是否有效
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res.status(400).json({ message: 'Page and limit must be positive numbers' })
    }
    const offset = (page - 1) * limit // 計算偏移量，分頁查詢時決定從第幾筆資料開始

    const result = await activityService.getPaginatedActivities(page, limit, offset)
    res.status(200).json({
      ...result,
    })
  },
}

export default activityController