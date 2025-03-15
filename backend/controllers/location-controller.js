import locationService from '../services/location-service.js'
import { handleError } from '../utils/handleError.js'

const locationController = {
  getAllLocation: async (req, res) => {
    try {
      const { search } = req.query
      const locations = await locationService.getAllLocations(search)

      res.status(200).json({
        message: '您已取得所有景點',
        locations,
      })
    } catch (err) {
      handleError(res, err)
    }
  },

  //autocompleteLocation
  autocompleteLocation: async (req, res) => {
    try {
      const { input } = req.query
      if (!input) {
        return res.status(400).json({ error: '請提供地點名稱' })
      }

      const predictions = await locationService.autocompleteLocation(input)
      res.status(200).json(predictions)
    } catch (err) {
      handleError(res, err)
    }
  },

  //detailsLocation
  detailsLocation: async (req, res) => {
    try {
      const { place_id } = req.query
      const locationDetails = await locationService.getLocationDetails(place_id)
      res.status(200).json(locationDetails)
    } catch (err) {
      handleError(res, err)
    }
  },
  createLocation: async (req, res) => {
    try {
      const { name, googlePlaceId, description } = req.body
      const newLocation = await locationService.createLocation({
        name,
        googlePlaceId,
        description,
      })

      res.status(201).json(newLocation)
    } catch (err) {
      handleError(res, err)
    }
  },
  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const location = await locationService.getLocationById(id)

      res.status(200).json({ message: '您已成功訪問景點詳細頁面', location })
    } catch (err) {
      handleError(res, err)
    }
  },
  deleteLocation: async (req, res) => {
    try {
      const { id } = req.params
      const deleteResult = await locationService.deleteLocation(id)

      res.status(200).json(deleteResult)
    } catch (err) {
      handleError(res, err)
    }
  },
  editLocationPage: async (req, res) => {
    try {
      const { id } = req.params
      const location = await locationService.getLocationForEdit(id)

      res.status(200).json(location)
    } catch (err) {
      handleError(res, err)
    }
  },
  editLocation: async (req, res) => {
    try {
      const { id } = req.params
      const updateData = req.body
      const updateResult = await locationService.updateLocation(id, updateData)

      res.status(200).json(updateResult)
    } catch (err) {
      handleError(res, err)
    }
  },
  getLocationAllImages: async (req, res) => {
    try {
      const { id } = req.params
      const images = await locationService.getLocationAllImages(id)

      res.status(200).json(images)
    } catch (err) {
      handleError(res, err)
    }
  },
  setLocationMainImage: async (req, res) => {
    try {
      const { id } = req.params
      const { main_image_id } = req.body
      const updateResult = await locationService.setLocationMainImage(
        id,
        main_image_id
      )

      res.status(200).json(updateResult)
    } catch (err) {
      handleError(res, err)
    }
  },
  getPaginatedLocations: async (req, res) => {
    try {
      const { page, limit } = req.query

      const paginatedLocations = await locationService.getPaginatedLocations(
        page,
        limit
      )

      res.status(200).json(paginatedLocations)
    } catch (err) {
      handleError(res, err)
    }
  },
}
export default locationController
