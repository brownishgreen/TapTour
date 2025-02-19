import { Activity, Image, Category } from '../models/index.js'
import { handleImageUpload } from '../utils/upload-handler.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { Op } from 'sequelize' // 引入 Sequelize 的操作符
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import { handleError } from '../utils/handleError.js'
import activityService from '../services/activity-service.js'

const activityController = {
  getAllActivities: async (req, res) => {
    try {
      const { search } = req.query
      const activities = await activityService.getAllActivities(search)
      res.status(200).json(activities)
    } catch (err) {
      handleError(res, err)
    }
  },
  getActivityById: async (req, res) => {
    try {
      const { id } = req.params
      const activity = await activityService.getActivityById(id)
      res.json(activity)
    } catch (err) {
      handleError(res, err)
    }
  },
  editActivityPage: async (req, res) => {
    try {
      const { id } = req.params
      const activity = await Activity.activityService.editActivityPage(id)
      res.status(200).json(activity)
    } catch (err) {
      handleError(res, err)
    }
  },
  editActivity: async (req, res) => {
    try {
      const { id } = req.params
      const {
        name,
        description,
        location_id,
        category_id,
        time_duration,
        price,
      } = req.body
      const activity = await activityService.updateActivity(id, {
        name,
        description,
        location_id,
        category_id,
        time_duration,
        price,
      })
      res.status(200).json(activity)
    } catch (err) {
      handleError(res, err)
    }
  },
  createActivityPage: async (req, res) => {
    try {
      res.status(200).json({ message: '這是創建活動頁面的json' })
    } catch (err) {
      handleError(res, err)
    }
  },
  createActivity: async (req, res) => {
    try {
      const result = await activityService.createActivity(req.body, req.files)
      res.status(201).json(result)
    } catch (err) {
      handleError(err)
    }
  },
  deleteActivity: async (req, res) => {
    try {
      const { id } = req.params
      const result = await activityService.deleteActivity(id)
      res.status(200).json(result)
    } catch (err) {
      handleError(err)
    }
  },
  getPaginatedActivities: async (req, res, next) => {
    try {
      // limit 主要是由前端傳入的，但如果前端沒有傳入，後端會使用預設的值
      // 10代表十進位制，不能隨意改動
      const page = parseInt(req.query.page, 10) || 1 // 預設為第 1 頁
      const limit = parseInt(req.query.limit, 10) || 6 // 預設每頁 6 筆
      const result = await activityService.getPaginatedActivities(page, limit)
      res.status(200).json(result)
    } catch (err) {
      handleError(err)
    }
  },
}

export default activityController
