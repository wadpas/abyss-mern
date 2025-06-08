import { Response } from 'express'
import Restaurant from '../models/restaurant.js'
import APIError from '../utils/api-error.js'
import cloudinary from 'cloudinary'
import mongoose from 'mongoose'

const getRestaurants = async (req: any, res: Response): Promise<any> => {
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

const getRestaurant = async (req: any, res: Response): Promise<any> => {
  console.log(req.body)

  const restaurant = await Restaurant.findOne({ user: req.userId })

  if (!restaurant) {
    throw new APIError(`No restaurant with user Id ${req.userId}`, 404)
  }

  res.status(200).json(restaurant)
}

// @desc Create new Restaurant
const createRestaurant = async (req: any, res: Response): Promise<any> => {
  console.log(req.body)

  const existingRestaurant = await Restaurant.findOne({ user: req.userId })

  if (existingRestaurant) {
    throw new APIError('User restaurant already exists', 409)
  }

  const imageUrl = await uploadImage(req.file as Express.Multer.File)

  const restaurant = new Restaurant(req.body)
  restaurant.imageUrl = imageUrl
  // @ts-ignore
  restaurant.user = new mongoose.Types.ObjectId(req.userId)
  await restaurant.save()

  res.status(201).send({ restaurant })
}

const updateRestaurant = async (req: any, res: Response): Promise<any> => {
  console.log(req.body)
  const restaurant = await Restaurant.findOne({ user: req.userId })

  if (!restaurant) {
    throw new APIError(`Restaurant not found`, 404)
  }

  if (req.file) {
    const imageUrl = await uploadImage(req.file as Express.Multer.File)
    restaurant.imageUrl = imageUrl
  }

  const updatedRestaurant = await Restaurant.findOneAndUpdate({ user: req.userId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ updatedRestaurant })
}

const deleteRestaurant = async (req: any, res: Response): Promise<any> => {
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

// @desc Upload image
const uploadImage = async (file: Express.Multer.File) => {
  const image = file
  const base64Image = Buffer.from(image.buffer).toString('base64')
  const dataURI = `data:${image.mimetype};base64,${base64Image}`

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)

  return uploadResponse.url
}

export { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant }
