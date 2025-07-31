import mongoose from 'mongoose'

const OrderModel = new mongoose.Schema({
  customerName: String,
  campus: String,
  address: String,
  paymentMode: String,
  deliveryStatus: String,
  paymentStatus: String,
  cartItems: [
    {
      name: String,
      price: Number,
      count: Number,
    },
  ],
  user: String,
  total: Number,
  createdAt: Date,
  orderNumber: String,
  billedStatus: Boolean,
})

// Prevent model overwrite errors in development
export const OrderSchema =
  mongoose.models.Order || mongoose.model('Order', OrderModel)