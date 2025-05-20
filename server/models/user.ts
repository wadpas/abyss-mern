import mongoose, { model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface IUser extends Document {
  email: string
  password: string
  name: string
  createJWT(): string
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const User = model<IUser>('User', UserSchema)

export default User
