import express from 'express'
import { getUsers, getUser, getCurrentUser, createUser, updateUser, updateUserPassword } from '../controllers/users.js'
import { authentication, authorization } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(authentication, authorization('admin'), getUsers)
router
  .route('/my')
  .get(authentication, getCurrentUser)
  .post(authentication, createUser)
  .patch(authentication, updateUser)
router.route('/update-password').patch(authentication, updateUserPassword)
router.route('/:id').get(authentication, getUser)

export default router
