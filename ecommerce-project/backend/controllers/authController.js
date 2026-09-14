import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const token = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
const safe = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar, addresses: user.addresses });
export async function register(req, res, next) { try { const { name, email, password } = req.body; if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email and password are required' }); if (await User.findOne({ email })) return res.status(409).json({ success: false, message: 'Email is already registered' }); const user = await User.create({ name, email, password }); res.status(201).json({ success: true, message: 'Account created', data: { user: safe(user), token: token(user._id) } }); } catch (e) { next(e); } }
export async function login(req, res, next) { try { const { email, password } = req.body; const user = await User.findOne({ email }).select('+password'); if (!user || !(await user.comparePassword(password))) return res.status(401).json({ success: false, message: 'Invalid email or password' }); res.json({ success: true, message: 'Welcome back', data: { user: safe(user), token: token(user._id) } }); } catch (e) { next(e); } }
export async function me(req, res) { res.json({ success: true, message: 'Profile fetched', data: { user: req.user } }); }
export async function profile(req, res, next) { try { const user = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true, runValidators: true }).select('-password'); res.json({ success: true, message: 'Profile updated', data: { user } }); } catch (e) { next(e); } }
