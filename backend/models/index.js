import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import configFile from '../config/config.js';

// 取得 `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

console.log(`🚀 Sequelize 啟動中，環境: ${env}`);

// ✅ 根據環境選擇資料庫連線方式
const sequelize = env === 'production'
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true, // ✅ PlanetScale 需要 SSL
      },
    },
  })
  : new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port || 3306,
      dialect: 'mysql',
      define: config.define,
      dialectOptions: config.dialectOptions,
    }
  );

console.log('✅ Sequelize 連線初始化完成');

// **✅ 讀取 models 目錄下的所有 `.js` 檔案**
const db = {};
const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js'));

// **✅ 載入所有 Models**
await Promise.all(
  modelFiles.map(async (file) => {
    const modelModule = await import(`file://${path.join(__dirname, file)}`);
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
  })
);

// **✅ 建立模型關聯**
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
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
  Favorite,
} = db;

// **✅ 測試資料庫連線**
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ 成功連接到資料庫！');
  } catch (error) {
    console.error('❌ 無法連線到資料庫:', error);
  }
})();