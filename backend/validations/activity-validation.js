import Joi from 'joi'

export const activitySchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages({
    'string.empty': '活動名稱不能為空',
    'string.min': '活動名稱至少需要 3 個字',
    'string.max': '活動名稱最多只能有 50 個字',
  }),
  description: Joi.string().required().messages({
    'string.empty': '活動描述不能為空'
  }),
  time_duration: Joi.number().required().messages({
    'number.base': '活動時間必須是數字'
  }),
  price: Joi.number().min(100).max(100000).required().messages({
    'number.min': '活動價格至少需要 100 元',
    'number.max': '活動價格最多只能有 6 位數'
  }),
  location_id: Joi.number().integer().required().messages({
    'number.empty': '請選擇活動地點'
  }),
  category_id: Joi.number().integer().required().messages({
    'number.empty': '請選擇活動分類'
  })
}).unknown(true) // 允許其他屬性