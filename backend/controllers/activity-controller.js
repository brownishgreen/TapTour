const { Activity, Location, Category } = require('../models')

const activityController = {
  getAllActivities: async (req, res, next) => {
    try {
      const activities = await Activity.findAll()
      res.status(200).json(activities)
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  getActivityById: async (req, res, next) => {
    try {
      const { id } = req.params
      const activity = await Activity.findByPk(Number(id))
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
      const { activityId } = req.params
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
      const { name, description, startDate, endDate, price, locationId, categoryId } = req.body
      const images = Object.keys(req.files).map(key => req.files[key][0].path)
      const activity = await Activity.create({
        name,
        description,
        startDate,
        endDate,
        price,
        locationId,
        categoryId,
        images: JSON.stringify(images) // 將圖片路徑轉換為JSON字串
      })
      res.status(200).json({ message: '活動創建成功', activity })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  },
  deleteActivity: async (req, res, next) => {
    try {
      const { activityId } = req.params
      const activity = await Activity.findByPk(Number(activityId))
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
