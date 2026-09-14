import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({ label: String, street: String, city: String, state: String, zip: String, country: { type: String, default: 'United States' } }, { _id: true });
const userSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true }, password: { type: String, required: true, minlength: 6, select: false }, phone: String, avatar: String, role: { type: String, enum: ['user', 'admin'], default: 'user' }, addresses: [addressSchema] }, { timestamps: true });
userSchema.pre('save', async function(next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); next(); });
userSchema.methods.comparePassword = function(value) { return bcrypt.compare(value, this.password); };
export default mongoose.model('User', userSchema);
