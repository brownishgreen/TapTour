import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import { fileURLToPath } from 'url'
import configFile from '../config/config.js'

// 取得 `__dirname`
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = configFile[env]

const db = {}

// 初始化 Sequelize
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config)

console.log('✅ Sequelize 初始化完成')

// 讀取 models 目錄下的所有 `.js` 檔案**
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js')
  )

// **✅ 同步載入所有 Models**
for (const file of modelFiles) {
  const modelModule = await import(`file://${path.join(__dirname, file)}`)
  const model = modelModule.default(sequelize, DataTypes)
  db[model.name] = model // ✅ 正確存入 `db`
}

// **建立模型關聯**
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
export const {
  User,
  Follower,
  Activity,
  Category,
  Comment,
  Image,
  Location,
  Order,
  OrderedItem,
  Product,
} = db
