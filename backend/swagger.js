//swagger.js
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

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
        },
        tags: [
            {
                name: 'Admin',
                description: '管理員相關操作'
            },
            {
                name: 'Users',
                description: '用戶相關操作'
            },
            {
                name: 'Followers',
                description: '追蹤者相關操作'
            },
            {
                name: 'Orders',
                description: '訂單相關操作'
            },
            {
                name: 'Activities',
                description: '活動相關操作'
            },
            {
                name: 'Categories',
                description: '活動類別相關操作'
            },
            {
                name: 'Products',
                description: '商品相關操作'
            },
            {
                name: 'Locations',
                description: '地點相關操作'
            },
            {
                name: 'Comments',
                description: '評論相關操作'
            }
        ]
    },
    apis: ['./routes/*.js'] //指定包含 Swagger 註解的文件所在的檔案位置
}

export const swaggerSpec = swaggerJSDoc(options)

export { swaggerUi } 
