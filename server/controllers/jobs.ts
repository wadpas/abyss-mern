import { Response } from 'express'
import StatusCodes from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import Job from '../models/job.js'

export const getJobs = async (req: any, res: Response): Promise<any> => {
  const { search, status, jobType, sort } = req.query

  interface queryObjectType {
    createdBy: string
    position?: Object
    status?: string
    jobType?: string
  }

  const queryObject: queryObjectType = {
    createdBy: req.user.userId,
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  let result = Job.find(queryObject)

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const jobs = await result

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

export const getJob = async (req: any, res: Response): Promise<any> => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job })
}

export const createJob = async (req: any, res: Response): Promise<any> => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const updateJob = async (req: any, res: Response): Promise<any> => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job })
}

export const deleteJob = async (req: any, res: Response): Promise<any> => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job })
}
