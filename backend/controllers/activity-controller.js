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
      const body = req

      // 確保 body 存在
      if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ message: '請求內容不能為空' });
      }
      console.log('接收到的請求 body:', body);


      console.log("Request body:", req.body);
      console.log("Uploaded files:", req.files);

      const { name, description, start_date, end_date, price, location_id, category_id } = req.body;

      if (!name || !description) {
        return res.status(400).json({ message: '必須提供活動名稱與描述' });
      }

      const activity = await Activity.create({
        name,
        description,
        start_date,
        end_date,
        price,
        location_id,
        category_id,
      });

      // if (req.files) {
      //   Object.keys(req.files).forEach((key) => {
      //     req.files[key].forEach(async (file) => {
      //       await Image.create({ image_url: file.path, activity_id: activity.id });
      //     });
      //   });
      // }

      res.status(201).json({ message: '活動已創建', activity });
    } catch (error) {
      console.error("Error in createActivity:", error);
      next(error);
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
