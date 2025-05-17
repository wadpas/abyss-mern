import { Request, Response } from 'express'

import Task from '../models/task.js'

export const getTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId })

    if (!task) {
      return res.status(404).json({ error: `Task with id ${taskId} not found` })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId })

    if (!task) {
      return res.status(404).json({ error: `Task with id ${taskId} not found` })
    }

    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ task: updatedTask })
  } catch (error) {}
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const taskId = req.params.id
    const task = await Task.findOneAndDelete({ _id: taskId })

    if (!task) {
      return res.status(404).json({ error: `Task with id ${taskId} not found` })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ error })
  }
}
