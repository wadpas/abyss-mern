import express from 'express'
import { authentication } from '../middleware/auth.js'
import multer from 'multer'
import { createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurant.js'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
})

router
  .route('/')
  .get(authentication, getRestaurant)
  .post(authentication, upload.single('imageFile'), createRestaurant)
  .put(authentication, upload.single('imageFile'), updateRestaurant)
router.route('/:id').delete(authentication, deleteRestaurant)

export default router
