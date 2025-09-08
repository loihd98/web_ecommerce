# 🚀 VuaXeMoHinh Deployment Successful!

## Deployed URLs:

- **Frontend**: https://frontend-8pc72v8kq-dev-eb0dacb6.vercel.app
- **Backend**: https://backend-3ftq4jnuh-dev-eb0dacb6.vercel.app

## ⚙️ Next Steps - Environment Variables Setup:

### 1. Backend Environment Variables

Go to: https://vercel.com/dashboard → Select "backend" project → Settings → Environment Variables

Add these variables:

```
MONGODB_URI = mongodb+srv://vuaxemohinh:your-password@cluster0.mongodb.net/vuaxemohinh?retryWrites=true&w=majority
JWT_SECRET = vuaxemohinh-super-secret-jwt-key-2024-minimum-32-characters
NODE_ENV = production
CORS_ORIGIN = https://frontend-8pc72v8kq-dev-eb0dacb6.vercel.app
```

### 2. Frontend Environment Variables

Go to: https://vercel.com/dashboard → Select "frontend" project → Settings → Environment Variables

Add these variables:

```
NEXT_PUBLIC_API_URL = https://backend-3ftq4jnuh-dev-eb0dacb6.vercel.app
NEXTAUTH_SECRET = vuaxemohinh-nextauth-secret-key-2024-minimum-32-characters
NEXTAUTH_URL = https://frontend-8pc72v8kq-dev-eb0dacb6.vercel.app
```

### 3. MongoDB Atlas Configuration

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
3. Database Access → Create user with read/write permissions
4. Get connection string and update MONGODB_URI above

### 4. After Setting Environment Variables:

```bash
# Redeploy both projects to apply environment variables
cd backend
vercel --prod

cd ../frontend
vercel --prod
```

## ✅ Test Your Deployment:

1. Visit: https://frontend-8pc72v8kq-dev-eb0dacb6.vercel.app
2. Check if products load correctly
3. Test user registration/login
4. Verify API connections work

## 🔧 Important Notes:

- Replace MongoDB password with your actual password
- JWT_SECRET and NEXTAUTH_SECRET should be at least 32 characters
- CORS_ORIGIN must exactly match frontend URL
- After setting env vars, redeploy both projects

Your VuaXeMoHinh e-commerce application is now live! 🎉
