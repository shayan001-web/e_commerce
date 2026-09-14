import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, slug: { type: String, unique: true }, image: String, description: String }, { timestamps: true });
export default mongoose.model('Category', schema);
