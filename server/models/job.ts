import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a task name'],
      trim: true,
      maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Job', jobSchema)
