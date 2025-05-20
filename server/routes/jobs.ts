import express from 'express'
import { getJobs, createJob, getJob, updateJob, deleteJob } from '../controllers/jobs.js'

const router = express.Router()

router.route('/').get(getJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router
