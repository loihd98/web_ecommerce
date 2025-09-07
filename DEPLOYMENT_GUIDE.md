# E-Commerce Deployment Guide

## Prerequisites

1. Vercel account (free)
2. GitHub account
3. Git installed

## Backend Deployment Steps

### 1. Initialize Git Repository (if not already done)

```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
```

### 2. Create GitHub Repository

1. Go to GitHub.com and create a new repository named "ecommerce-backend"
2. Push your code:

```bash
git remote add origin https://github.com/yourusername/ecommerce-backend.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub account
4. Select "ecommerce-backend" repository
5. Configure settings:
   - Framework Preset: Other
   - Build Command: `npm run vercel-build`
   - Output Directory: Leave empty
   - Install Command: `npm install`
6. Add Environment Variables in Vercel dashboard:
   - `JWT_SECRET`: your-super-secret-jwt-key
   - `NODE_ENV`: production
   - `FRONTEND_URL`: https://your-frontend-domain.vercel.app
7. Click "Deploy"

## Frontend Deployment Steps

### 1. Initialize Git Repository (if not already done)

```bash
cd frontend
git init
git add .
git commit -m "Initial frontend commit"
```

### 2. Create GitHub Repository

1. Create a new repository named "ecommerce-frontend"
2. Push your code:

```bash
git remote add origin https://github.com/yourusername/ecommerce-frontend.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

1. Import "ecommerce-frontend" repository
2. Configure settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: Leave empty
   - Install Command: `npm install`
3. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: https://your-backend-domain.vercel.app/api
   - `NEXTAUTH_SECRET`: your-super-secret-nextauth-key
   - `NEXTAUTH_URL`: https://your-frontend-domain.vercel.app
   - (Optional) Google/Facebook OAuth credentials
4. Click "Deploy"

## Post-Deployment Steps

### 1. Update Backend CORS

After frontend deployment, update the backend environment variable:

- `FRONTEND_URL`: https://your-actual-frontend-domain.vercel.app

### 2. Update Frontend API URL

After backend deployment, update the frontend environment variable:

- `NEXT_PUBLIC_API_URL`: https://your-actual-backend-domain.vercel.app/api

### 3. Test the Application

1. Visit your frontend URL
2. Test login/registration
3. Test admin panel access
4. Verify all features work

## Troubleshooting

### Backend Issues

- Check Vercel function logs
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Frontend Issues

- Check build logs for TypeScript errors
- Verify API URL is correct
- Test in incognito mode to avoid caching

### Database

- SQLite database is included in deployment
- For production, consider upgrading to PostgreSQL on Vercel

## Domain Setup (Optional)

1. Purchase a custom domain
2. Add it in Vercel dashboard
3. Update NEXTAUTH_URL and FRONTEND_URL accordingly
