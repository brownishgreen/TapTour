import { Activity, Image, Category } from '../models'
import { Op } from 'sequelize'

const getAllActivities = async (search) => {
  const queryOptions = {
    include: [
      { model: Image, as: 'images', attributes: ['image_url'] },
      { model: Category, as: 'category', attributes: ['name'] },
    ],
  }
  if (search) {
    queryOptions.where = { name: { [Op.like]: `%${search}%` } }
  }
  return await Activity.findAll(queryOptions)
}

const getActivityById = async (id) => {
  return await Activity.findByPk(id, {
    include: [
      { model: Image, as: 'images', attributes: ['image_url'] },
      { model: Category, as: 'category', attributes: ['name'] },
    ],
  })
}

const createActivity = async (data) => {
  return await Activity.create(data)
}

const updateActivity = async (id, data) => {
  const activity = await Activity.findByPk(id)
  if (!activity) return null
  return await activity.update(data)
}

const deleteActivity = async (id) => {
  const activity = await Activity.findByPk(id)
  if (!activity) return null
  await activity.destroy()
  return activity
}

const getPaginatedActivities = async (page, limit) => {
  const offset = (page - 1) * limit
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
  return { activities, totalPages: Math.ceil(totalItems / limit), totalItems }
}

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getPaginatedActivities,
}
