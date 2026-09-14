import Category from '../models/Category.js';
import slugify from 'slugify';
export async function list(req, res, next) { try { res.json({ success: true, message: 'Categories fetched', data: { categories: await Category.find().sort('name') } }); } catch (e) { next(e); } }
export async function create(req, res, next) { try { const category = await Category.create({ ...req.body, slug: slugify(req.body.name, { lower: true, strict: true }) }); res.status(201).json({ success: true, message: 'Category created', data: { category } }); } catch (e) { next(e); } }
export async function update(req, res, next) { try { const category = await Category.findByIdAndUpdate(req.params.id, { ...req.body, ...(req.body.name && { slug: slugify(req.body.name, { lower: true, strict: true }) }) }, { new: true }); res.json({ success: true, message: 'Category updated', data: { category } }); } catch (e) { next(e); } }
export async function remove(req, res, next) { try { await Category.findByIdAndDelete(req.params.id); res.json({ success: true, message: 'Category deleted', data: {} }); } catch (e) { next(e); } }
