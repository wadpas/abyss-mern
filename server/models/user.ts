import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: [true, 'Please provide auth0Id'],
    },
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot be more than 50 characters'],
      trim: true,
    },
    //@ts-ignore
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    name: {
      type: String,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [50, 'Name cannot be more than 50 characters'],
      trim: true,
    },
    address: {
      type: String,
      minlength: [5, 'Address must be at least 5 characters'],
      maxlength: [100, 'Address cannot be more than 100 characters'],
      trim: true,
    },
    city: {
      type: String,
      minlength: [2, 'City name must be at least 2 characters'],
      maxlength: [50, 'City name cannot be more than 50 characters'],
      trim: true,
    },
    country: {
      type: String,
      minlength: [3, 'Country name must be at least 3 characters'],
      maxlength: [50, 'Country name cannot be more than 50 characters'],
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      default: 'password',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model('User', userSchema)
