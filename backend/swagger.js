//swagger.js
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TapTour API',
            version: '1.0.0',
            description:
                'TapTour 是一個讓用戶可以探索並管理旅遊行程的應用程式。\n\n' +
                '本 API 提供了用戶註冊、登入、個人檔案、管理員後台操作，\n' +
                '與旅遊活動、商品、景點、留言相關的操作。\n\n' +
                '整合了驗證系統與安全機制，確保資料傳輸的安全性，\n' +
                '並以 RESTful 標準設計，方便開發者串接。'
        }
    },
    apis: ['./routes/*.js'] //指定包含 Swagger 註解的文件所在的檔案位置
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = { swaggerSpec, swaggerUi }
