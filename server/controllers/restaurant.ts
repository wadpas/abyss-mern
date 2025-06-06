import { Response } from 'express'
import Restaurant from '../models/restaurant.js'
import APIError from '../utils/api-error.js'

export const getRestaurants = async (req: any, res: Response): Promise<any> => {
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
  let result = Restaurant.find(queryObject)

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

  const totalRestaurants = await Restaurant.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalRestaurants / limit)

  res.status(200).json({ jobs, totalRestaurants, numOfPages })
}

export const getRestaurant = async (req: any, res: Response): Promise<any> => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Restaurant.findOne({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new APIError(`No job with id ${jobId}`, 404)
  }

  res.status(200).json({ job })
}

export const createRestaurant = async (req: any, res: Response): Promise<any> => {
  req.body.createdBy = req.user.userId
  const job = await Restaurant.create(req.body)
  res.status(201).json({ job })
}

export const updateRestaurant = async (req: any, res: Response): Promise<any> => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Restaurant.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!job) {
    throw new APIError(`No job with id ${jobId}`, 404)
  }

  res.status(200).json({ job })
}

export const deleteRestaurant = async (req: any, res: Response): Promise<any> => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Restaurant.findOneAndDelete({ _id: jobId, createdBy: userId })

  if (!job) {
    throw new APIError(`No job with id ${jobId}`, 404)
  }

  res.status(200).json({ job })
}
