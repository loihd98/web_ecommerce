# 🛒 E-Commerce Platform - Complete Guide

A full-stack e-commerce platform built with Next.js 15, NestJS, TypeORM, and Redux Toolkit, featuring multi-language support, real-time chat, and comprehensive admin panel.

## 🚀 Live Deployment

- **Frontend**: https://web-thuong-mai-frontend.vercel.app
- **Backend API**: https://web-thuong-mai-backend.vercel.app
- **API Documentation**: https://web-thuong-mai-backend.vercel.app/api/docs

## 🌟 Features

### 🛍️ E-Commerce Features

- **Product Management**: Complete CRUD operations with image upload
- **Shopping Cart**: Persistent cart with Redux state management
- **User Authentication**: JWT-based auth with social login (Google, Facebook)
- **Order Management**: Full order lifecycle with status tracking
- **Payment Integration**: Ready for payment gateway integration
- **Admin Dashboard**: Comprehensive admin panel for store management

### 🌍 Multi-Language Support

- **8 Languages Supported**: English, Vietnamese, Spanish, French, German, Japanese, Korean, Chinese
- **URL-based Routing**: `/en/products`, `/vi/san-pham`, etc.
- **Automatic Detection**: Browser language detection with fallback
- **Persistent Selection**: Language preference saved in localStorage

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching capability
- **Component Library**: Reusable UI components
- **Loading States**: Skeleton loaders and smooth transitions

## 🏗️ Architecture

```
web_thuong_mai/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── products/       # Product management
│   │   ├── categories/     # Category management
│   │   ├── cart/           # Shopping cart
│   │   ├── orders/         # Order management
│   │   ├── payments/       # Payment processing
│   │   └── chatbot/        # AI chatbot integration
│   ├── database/           # Database configuration
│   └── dist/               # Compiled output
├── frontend/               # Next.js 15 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── [lang]/     # Internationalized routes
│   │   │   │   ├── products/
│   │   │   │   ├── admin/
│   │   │   │   ├── cart/
│   │   │   │   └── checkout/
│   │   │   └── api/        # API routes
│   │   ├── components/     # Reusable components
│   │   ├── store/          # Redux store
│   │   ├── services/       # API services
│   │   └── hooks/          # Custom hooks
└── docs/                   # Documentation
```

## 🛠️ Tech Stack

### Backend

- **Framework**: NestJS (Node.js framework)
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **ORM**: TypeORM
- **Authentication**: JWT + Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Social Auth**: NextAuth.js integration
- **Deployment**: Vercel Serverless Functions

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: NextAuth.js
- **Internationalization**: Custom i18n with URL routing
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/loihd98/web_ecommerce.git
cd web_ecommerce
```

### 2. Backend Setup

```bash
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations and seed data
npm run seed

# Start development server
npm run start:dev
```

The backend will be available at http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

## 🌍 Multi-Language Implementation

### URL Structure

```
/en/                    # English (default)
/vi/                    # Vietnamese
/es/                    # Spanish
/fr/                    # French
/de/                    # German
/ja/                    # Japanese
/ko/                    # Korean
/zh/                    # Chinese
```

### Adding New Translations

1. **Update translation files**: Add new keys to `src/hooks/useTranslation.ts`
2. **Test all languages**: Ensure all text is properly translated
3. **Update language selector**: Verify new language appears in switcher

## 🔐 Authentication

### Local Authentication

- **Registration**: Email/password signup with validation
- **Login**: JWT token-based authentication
- **Profile Management**: User profile updates

### Social Authentication

- **Google OAuth**: Google account integration
- **Facebook Login**: Facebook account integration
- **Configuration**: Set up OAuth apps and add credentials to environment variables

## 📡 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/social-login` - Social authentication
- `GET /api/auth/profile` - Get user profile

### Product Endpoints

- `GET /api/products` - List all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product (Admin)
- `PATCH /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Category Endpoints

- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category details
- `POST /api/categories` - Create new category (Admin)
- `PATCH /api/categories/:id` - Update category (Admin)

### Cart Endpoints

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Order Endpoints

- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status (Admin)

## 🚀 Deployment

### Production Deployment on Vercel

#### Backend Deployment

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Vercel**: Import project in Vercel dashboard
3. **Configure Build Settings**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key
   POSTGRES_URL=your-postgres-connection-string
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_CLIENT_ID=your-facebook-client-id
   FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
   ```

#### Frontend Deployment

1. **Connect to Vercel**: Import frontend project
2. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app/api
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=https://your-frontend-domain.vercel.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_CLIENT_ID=your-facebook-client-id
   FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
   ```

### Database Setup

#### Development (SQLite)

- Automatically created when running `npm run seed`
- Located at `backend/ecommerce.db`

#### Production (PostgreSQL)

1. **Create Vercel Postgres Database**:

   - Go to Vercel Dashboard → Storage → Create Database
   - Select PostgreSQL
   - Copy connection string

2. **Update Environment Variables**:
   - Add `POSTGRES_URL` to backend deployment
   - Database will be automatically migrated on deployment

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Test coverage
```

### Frontend Testing

```bash
cd frontend
npm run test          # Jest tests
npm run test:e2e      # Playwright tests
```

## 🎨 Customization

### Theming

- **Colors**: Modify `tailwind.config.js`
- **Components**: Update component styles in `src/components/ui/`
- **Global Styles**: Edit `src/app/globals.css`

### Adding Features

1. **Backend**: Create new modules in `backend/src/`
2. **Frontend**: Add new pages in `frontend/src/app/[lang]/`
3. **Components**: Create reusable components in `frontend/src/components/`

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

- **TypeScript errors**: Run `npm run type-check`
- **Missing dependencies**: Run `npm install`
- **Environment variables**: Check `.env` files

#### Database Issues

- **Connection errors**: Verify database URL
- **Migration issues**: Run `npm run seed` to reset data

#### Authentication Issues

- **Social login not working**: Check OAuth app configuration
- **JWT errors**: Verify JWT_SECRET environment variable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

## 🔄 Version History

- **v2.0.0** - Multi-language support, real database integration, social auth
- **v1.1.0** - Admin panel, cart functionality, order management
- **v1.0.0** - Initial release with basic e-commerce features

---

**Made with ❤️ by the development team**
