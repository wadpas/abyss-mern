import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      maxlength: [40, 'Name cannot be more than 20 characters'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Please provide a position name'],
      maxlength: [120, 'Name cannot be more than 20 characters'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['interview', 'provide', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Job', jobSchema)
