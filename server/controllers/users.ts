import { Request, Response } from 'express'
import User from '../models/user.js'
import { attachCookiesToResponse, createTokenUser, checkPermissions } from '../utils/auth.js'
import APIError from '../utils/api-error.js'

// @desc Fetch all users
const getUsers = async (req: Request, res: Response): Promise<any> => {
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(200).json({ users })
}

// @desc Fetch single user by ID
const getUser = async (req: any, res: Response): Promise<any> => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')
  if (!user) {
    throw new APIError(`No user with id ${req.params.id}`, 404)
  }
  checkPermissions(req.user, user._id)
  res.status(200).json({ user })
}

// @desc Retrieve user from token
const getCurrentUser = async (req: any, res: Response): Promise<any> => {
  const user = await User.findOne({ _id: req.userId }).select('-password')
  if (!user) {
    throw new APIError(`No user with id ${req.userId}`, 404)
  }
  res.status(200).json({ user })
}

// @desc Create user
const createUser = async (req: Request, res: Response): Promise<any> => {
  const { auth0Id } = req.body
  const existingUser = await User.findOne({ auth0Id }).select('-password')

  if (existingUser) {
    res.status(200).json({ user: existingUser })
  } else {
    const user = await User.create(req.body)
    user.password = ''
    res.status(201).json({ user })
  }
}

// @desc Update user
const updateUser = async (req: any, res: Response): Promise<any> => {
  const { username, name, address, city, country } = req.body

  const user = await User.findOne({ _id: req.userId })

  if (!user) {
    throw new APIError(`No user with id ${req.user}`, 404)
  }

  user.username = username
  user.name = name
  user.address = address
  user.city = city
  user.country = country

  await user.save()
  // const tokenUser = createTokenUser(user)
  // attachCookiesToResponse(res, tokenUser)
  res.status(200).json({ user })
}

// @desc Update user password
const updateUserPassword = async (req: any, res: Response): Promise<any> => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    throw new APIError('Please provide both values', 400)
  }

  const user = await User.findOne({ _id: req.userId })

  if (!user) {
    throw new APIError(`No user with id ${req.userId}`, 404)
  }
  //@ts-ignore
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new APIError('Invalid Credentials', 401)
  }
  user.password = newPassword

  await user.save()
  res.status(200).json({ msg: 'Success! Password Updated.' })
}

export { getUsers, getUser, getCurrentUser, createUser, updateUser, updateUserPassword }
