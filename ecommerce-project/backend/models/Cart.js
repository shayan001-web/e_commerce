import mongoose from 'mongoose';
const schema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }, items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number, price: Number, name: String, image: String }], totalPrice: { type: Number, default: 0 } }, { timestamps: true });
export default mongoose.model('Cart', schema);
