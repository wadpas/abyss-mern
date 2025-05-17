import express, { Request, Response } from 'express'

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
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  res.send('update task')
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  res.send('delete task')
}
