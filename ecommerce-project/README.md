# Nexa Market

A production-minded full-stack storefront built with React, Vite, Express, MongoDB, and JWT authentication. The frontend and backend are intentionally independent applications.

## Stack

- Frontend: React, Vite, React Router, Axios, Context API, Tailwind CSS, React Icons
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer

## Run locally

### Backend

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
3. `cd backend && npm install`
4. `npm run seed` for 18 products, categories, users, and an admin.
5. `npm run dev` starts the API on port 5000.

Seed admin: `admin@nexamarket.com` / `Admin123!`

### Frontend

1. `cd frontend && npm install`
2. Copy `.env.example` to `.env` if the API is not on `http://localhost:5000/api`.
3. `npm run dev` starts Vite on port 5173.

## API overview

Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/profile`  
Products: `/api/products` with search, category, price, rating, sort, page, and limit query parameters  
Categories: `/api/categories`  
Cart: `/api/cart`  
Orders: `/api/orders`  
Admin users: `/api/users`

All responses use `{ success, message, data }`; errors use `{ success: false, message, error }`. Admin mutations require a JWT bearer token and the admin role.

## Production

Build the frontend with `npm run build` and serve `frontend/dist` from a static host. Set `CLIENT_URL` to the deployed frontend and use a managed MongoDB deployment. Never commit `.env` files or production secrets.
