# 🚀 VuaXeMoHinh Vercel Deployment Guide

## Prerequisites

- Vercel account set up
- Vercel CLI installed (`npm i -g vercel`)
- Git repository connected to Vercel

## Backend Deployment

### 1. Deploy Backend to Vercel

```bash
cd backend
vercel --prod
```

### 2. Environment Variables for Backend

Set these in Vercel Dashboard > Project > Settings > Environment Variables:

```bash
# Database Configuration
DB_TYPE=postgres
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=vuaxemohinh_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-vuaxemohinh-production
JWT_EXPIRATION=24h

# App Configuration
NODE_ENV=production
PORT=3000

# CORS Configuration
FRONTEND_URL=https://vuaxemohinh.vercel.app
VERCEL_FRONTEND_URL=https://vuaxemohinh.vercel.app

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Frontend Deployment

### 1. Deploy Frontend to Vercel

```bash
cd frontend
vercel --prod
```

### 2. Environment Variables for Frontend

Set these in Vercel Dashboard > Project > Settings > Environment Variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-nextauth-key-vuaxemohinh
NEXTAUTH_URL=https://vuaxemohinh.vercel.app

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## CORS Verification Steps

### 1. After Deployment, Test CORS:

Open browser console on your deployed frontend and run:

```javascript
fetch("https://your-backend-url.vercel.app/api/products")
  .then((response) => response.json())
  .then((data) => console.log("CORS working:", data))
  .catch((error) => console.error("CORS error:", error));
```

### 2. Test Forgot Password API:

```javascript
fetch("https://your-backend-url.vercel.app/api/auth/forgot-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@example.com" }),
})
  .then((response) => response.json())
  .then((data) => console.log("Forgot password CORS:", data))
  .catch((error) => console.error("CORS error:", error));
```

## Domain Configuration

### Custom Domain Setup (Optional)

If you want to use `vuaxemohinh.com`:

1. **Vercel Dashboard** > Project > Settings > Domains
2. Add `vuaxemohinh.com` and `www.vuaxemohinh.com`
3. Update DNS records as instructed by Vercel
4. Update environment variables with new domain

## Post-Deployment Checklist

### ✅ Verify These Features Work:

- [ ] Homepage loads with VuaXeMoHinh branding
- [ ] Language switching (EN/VI) persists across pages
- [ ] Dark/Light theme toggle works
- [ ] Forgot password form submits successfully
- [ ] API calls return data (check Network tab)
- [ ] No CORS errors in console

### 🔧 Common CORS Issues & Solutions:

**Issue**: "Access to fetch blocked by CORS policy"
**Solution**: Check that frontend domain is in backend CORS whitelist

**Issue**: "Preflight request doesn't pass"
**Solution**: Ensure OPTIONS method is allowed in CORS config

**Issue**: "Credentials include error"
**Solution**: Verify `credentials: true` in both frontend and backend

## Monitoring & Debugging

### 1. Check Vercel Function Logs:

```bash
vercel logs https://your-backend-url.vercel.app
```

### 2. Test API Endpoints:

```bash
# Test backend health
curl https://your-backend-url.vercel.app/api/products

# Test CORS headers
curl -H "Origin: https://vuaxemohinh.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://your-backend-url.vercel.app/api/auth/login
```

### 3. Frontend Console Debugging:

```javascript
// Check API URL configuration
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

// Test API connection
fetch(process.env.NEXT_PUBLIC_API_URL + "/products")
  .then((r) => r.json())
  .then((data) => console.log("API Response:", data));
```

## Deployment Commands Summary

```bash
# Build and deploy backend
cd backend
npm run build
vercel --prod

# Build and deploy frontend
cd ../frontend
npm run build
vercel --prod
```

## Environment Variables Summary

### Backend Vercel Settings:

- `JWT_SECRET`: Production JWT secret
- `DB_TYPE`: postgres (for production)
- `FRONTEND_URL`: https://vuaxemohinh.vercel.app
- `NODE_ENV`: production

### Frontend Vercel Settings:

- `NEXT_PUBLIC_API_URL`: https://your-backend.vercel.app/api
- `NEXTAUTH_URL`: https://vuaxemohinh.vercel.app
- `NEXTAUTH_SECRET`: Production NextAuth secret

---

🏎️ **VuaXeMoHinh is ready for production!**

After successful deployment, your model car e-commerce site will be live with:

- ✅ Multi-language support (8 languages)
- ✅ Dark/Light theme switching
- ✅ Forgot password functionality
- ✅ CORS properly configured
- ✅ Mobile-responsive design
- ✅ Car-themed branding
