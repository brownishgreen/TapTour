import Joi from 'joi'

const validation = {
  userValidation: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  activityValidation: Joi.object({
    name: Joi.string().required(),
    time_duration: Joi.number().required(),
    price: Joi.number().required(),
    location_id: Joi.number().required(),
    category_id: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  }),
  productValidation: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
  }),
  
  edit
}

export default validation