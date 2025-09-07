# E-commerce Monorepo - Vercel Deployment

This repository contains both backend (NestJS) and frontend (Next.js) for the e-commerce application.

## Structure

```
/
├── backend/          # NestJS API (Deploy as Vercel Functions)
├── frontend/         # Next.js App (Deploy as Vercel App)
├── README.md
└── vercel.json       # Monorepo configuration
```

## Deployment

### Backend API

- **URL**: `https://web-ecommerce-api.vercel.app/api`
- **Type**: Serverless Functions
- **Database**: Vercel Postgres

### Frontend App

- **URL**: `https://web-ecommerce.vercel.app`
- **Type**: Next.js Static/SSR
- **Features**: E-commerce storefront + Admin panel

## Demo Accounts

```
Admin: admin@ecommerce.com / admin123
Customer: demo@customer.com / customer123
Test: test@user.com / demo123
```

## Technologies

- **Backend**: NestJS, TypeORM, PostgreSQL, JWT
- **Frontend**: Next.js 14, TypeScript, Redux, Tailwind CSS
- **Database**: Vercel Postgres
- **Hosting**: Vercel (Backend + Frontend)
- **Auth**: JWT + NextAuth.js (Social Login)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both backend and frontend
3. Configure environment variables
4. Run the development servers

### Backend (Port 5000)

```bash
cd backend
npm install
npm run start:dev
```

### Frontend (Port 3000)

```bash
cd frontend
npm install
npm run dev
```

## API Documentation

The backend API will be available at `http://localhost:5000/api` with the following endpoints:

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PATCH /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category details
- `POST /api/categories` - Create category (Admin)
- `PATCH /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Users

- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user details
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Cart & Orders

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:id` - Remove from cart
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

## Development Status

✅ Project setup complete
✅ Backend API running
✅ Frontend application running
✅ Basic authentication implemented
✅ Product catalog functional
✅ Admin dashboard available
✅ Vercel deployment ready

## License

MIT License
