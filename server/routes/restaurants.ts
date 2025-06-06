import express from 'express'
import { authentication } from '../middleware/auth.js'
import multer from 'multer'
import {
  getRestaurants,
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurant.js'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
})

router.route('/').get(authentication, getRestaurants).post(authentication, upload.single('imageFile'), createRestaurant)
router
  .route('/:id')
  .get(authentication, getRestaurant)
  .patch(authentication, updateRestaurant)
  .delete(authentication, deleteRestaurant)

export default router
