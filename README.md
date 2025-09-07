# 🏎️ VuaXeMoHinh - Model Cars E-commerce

A modern, multilingual e-commerce platform for model cars with dark/light theme support.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PowerShell (Windows)

### Deployment

```powershell
# Clone and navigate to project
git clone <your-repo>
cd web_thuong_mai

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Deploy (builds and starts both services)
cd ..
./deploy.ps1
```

## 🌟 Features

### 🎨 Frontend Features

- **Multi-language Support**: 8 languages (EN, VI, ES, FR, DE, IT, RU, ZH)
- **Dark/Light Theme**: Smooth theme switching with system preference detection
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Next.js 15 with static generation
- **Modern UI**: Car-themed branding with gradient effects

### 🔧 Backend Features

- **NestJS Framework**: Modular, scalable architecture
- **Authentication**: JWT-based with forgot/reset password
- **Database**: SQLite (development) / PostgreSQL (production)
- **API Documentation**: Auto-generated Swagger docs
- **CORS Configuration**: Properly configured for cross-origin requests

### � E-commerce Features

- Product catalog with categories
- Shopping cart functionality
- Order management system
- User authentication and profiles
- Admin dashboard
- Payment integration ready

## 🌐 URLs

After deployment, access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api/docs
- 🌍 **Multi-Language**: 8 languages with URL-based routing
- 📱 **Responsive**: Mobile-first design
- ⚡ **Modern Stack**: Next.js 15, NestJS, TypeORM, Redux

## �‍♂️ Local Development

```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend
cd frontend
npm install
npm run dev
```

For detailed setup instructions, see the [Complete Guide](./COMPLETE_GUIDE.md).

---

**📋 All documentation has been consolidated into the [Complete Guide](./COMPLETE_GUIDE.md) for easier maintenance and better organization.**

- localStorage persistence
- Fallback to English for missing translations
- Responsive design for all languages

## Demo Accounts

```
Admin: admin@ecommerce.com / admin123
Customer: demo@customer.com / customer123
Test: test@user.com / demo123
```

## Technologies

- **Backend**: NestJS, TypeORM, PostgreSQL, JWT
- **Frontend**: Next.js 14, TypeScript, Redux, Tailwind CSS
- **Internationalization**: Custom i18n implementation for App Router
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
