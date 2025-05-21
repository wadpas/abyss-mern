import { Request, Response, NextFunction } from 'express'
import StatusCodes from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import Job from '../models/job.js'

export const getJobs = async (req: any, res: Response): Promise<any> => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
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
    body: { company, position },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }

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
