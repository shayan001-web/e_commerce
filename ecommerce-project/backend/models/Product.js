import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, name: String, rating: { type: Number, min: 1, max: 5 }, comment: String }, { timestamps: true });
const schema = new mongoose.Schema({ name: { type: String, required: true }, slug: { type: String, unique: true }, description: String, price: { type: Number, required: true }, discountPrice: Number, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, images: [String], stock: { type: Number, default: 0 }, brand: String, rating: { type: Number, default: 0 }, numReviews: { type: Number, default: 0 }, reviews: [reviewSchema] }, { timestamps: true });
export default mongoose.model('Product', schema);
