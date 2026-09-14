import User from '../models/User.js';
export async function list(req, res, next) { try { const users = await User.find().select('-password').sort('-createdAt'); res.json({ success: true, message: 'Users fetched', data: { users } }); } catch (e) { next(e); } }
export async function getOne(req, res, next) { try { const user = await User.findById(req.params.id).select('-password'); res.json({ success: true, message: 'User fetched', data: { user } }); } catch (e) { next(e); } }
export async function update(req, res, next) { try { const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password'); res.json({ success: true, message: 'User updated', data: { user } }); } catch (e) { next(e); } }
export async function remove(req, res, next) { try { await User.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'User deleted', data: {} }); } catch (e) { next(e); } }
