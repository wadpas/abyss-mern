import express from 'express'
import { authentication } from '../middleware/auth.js'

import { getJobs, createJob, getJob, updateJob, deleteJob } from '../controllers/jobs.js'

const router = express.Router()

router.route('/').get(authentication, getJobs).post(authentication, createJob)
router.route('/:id').get(authentication, getJob).patch(authentication, updateJob).delete(authentication, deleteJob)

export default router
