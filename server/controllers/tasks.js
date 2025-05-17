import Task from '../models/task.js'

export const getTasks = async (req, res) => {
  res.send('get tasks')
}

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getTask = async (req, res) => {
  res.send('get single task')
}

export const updateTask = async (req, res) => {
  res.send('update task')
}

export const deleteTask = async (req, res) => {
  res.send('delete task')
}
