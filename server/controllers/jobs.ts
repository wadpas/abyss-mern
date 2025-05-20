import { Request, Response, NextFunction } from 'express'
import Job from '../models/job.js'

export const getJobs = async (req: Request, res: Response): Promise<any> => {
  const jobs = await Job.find({})
  res.status(200).json({ jobs })
}

export const createJob = async (req: Request, res: Response): Promise<any> => {
  const job = await Job.create(req.body)
  res.status(201).json({ job })
}

export const getJob = async (req: Request, res: Response): Promise<any> => {
  const jobId = req.params.id
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    return res.status(404).json({ error: `Job with id ${jobId} not found` })
  }

  res.status(200).json({ job })
}

export const updateJob = async (req: Request, res: Response): Promise<any> => {
  const jobId = req.params.id
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    return res.status(404).json({ error: `Job with id ${jobId} not found` })
  }

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ job: updatedJob })
}

export const deleteJob = async (req: Request, res: Response): Promise<any> => {
  const jobId = req.params.id
  const job = await Job.findOneAndDelete({ _id: jobId })

  if (!job) {
    return res.status(404).json({ error: `Job with id ${jobId} not found` })
  }

  res.status(200).json({ job })
}
