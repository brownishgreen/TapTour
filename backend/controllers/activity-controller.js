const { Activity } = require('../models')

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
      const activity = await Activity.findByPk(id)
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
      const { id } = req.params
      const activity = await Activity.findByPk(id)
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
      const { id } = req.params
      const { name, description, location, date, time, price } = req.body
      const activity = await Activity.findByPk(id)
      if (!activity) {
        return res.status(404).json({ message: '活動不存在' })
      }
      await activity.update({ name, description, location, date, time, price })
      res.status(200).json({ message: '活動更新成功' })
    } catch (err) {
      err.statusCode = 500
      next(err)
    }
  }
}

module.exports = activityController
