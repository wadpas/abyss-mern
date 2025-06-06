import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide menu item name'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name can not be more than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide menu item price'],
    default: 0,
  },
})

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide restaurant name'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      minlength: [3, 'City must be at least 3 characters'],
      maxlength: [50, 'City can not be more than 50 characters'],
    },
    country: {
      type: String,
      required: [true, 'Please provide country'],
      minlength: [3, 'Country must be at least 3 characters'],
      maxlength: [50, 'Country can not be more than 50 characters'],
    },
    deliveryPrice: {
      type: Number,
      required: [true, 'Please provide delivery price'],
      default: 0,
    },
    deliveryTime: {
      type: Number,
      required: [true, 'Please provide delivery time'],
      default: 0,
    },
    cuisines: [
      {
        type: String,
        required: [true, 'Please provide cuisines'],
        minlength: [3, 'Cuisines must be at least 3 characters'],
        maxlength: [50, 'Cuisines can not be more than 50 characters'],
      },
    ],
    menuItems: [menuItemSchema],
    imageUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Restaurant', restaurantSchema)
