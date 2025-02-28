import userService from '../services/user-service.js'
import { handleError } from '../utils/handleError.js'
import multerConfig from '../utils/multer-config.js'
const { uploadToGCS } = multerConfig

const userController = {
  registerPage: (req, res) => {
    res.status(200).json({ message: '這是註冊頁面的json' })
  },

  register: async (req, res) => {
    try {
      const userData = req.body
      const registerResult = await userService.register(userData)
      res.status(201).json(registerResult)
    } catch (err) {
      handleError(res, err)
    }
  },

  loginPage: (req, res) => {
    res.status(200).json({ message: '這是登入頁面的json' })
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      console.log('email', email)
      console.log('password', password)
      const loginResult = await userService.login(email, password)
      console.log('loginResult', loginResult)
      res.cookie('token', loginResult.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 3600000,
      })
      console.log('res.cookie', res.cookie)
      res.status(200).json(loginResult)
    } catch (err) {
      handleError(res, err)
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('token')
      req.session.destroy(() => {
        res.status(200).json({ message: '已成功登出' })
      })
    } catch (err) {
      handleError(res, err)
    }
  },

  profile: async (req, res) => {
    try {
      const { userId } = req.params
      const currentUserId = req.user.id
      const result = await userService.getUserProfile(userId, currentUserId)
      res.json(result)
    } catch (err) {
      handleError(res, err)
    }
  },

  verify: async (req, res) => {
    try {
      const user = req.user
      const verifyResult = await userService.verifyUser(user)
      res.status(200).json(verifyResult)
    } catch (err) {
      handleError(res, err)
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { userId } = req.params
      const userData = req.body
      const avatar = req.file
      const updateProfileResult = await userService.updateProfile(userId, userData, avatar)
      res.status(200).json(updateProfileResult)
    } catch (err) {
      handleError(res, err)
    }
  },
}

export default userController
