# Vercel Environment Variables Setup - Updated

## 🚨 FIXED: Backend Environment Variables

Add these environment variables in your Vercel backend project dashboard:

### 1. MongoDB Configuration (CORRECTED)

```
MONGODB_URI = mongodb+srv://loihd98:Toiyeuban98@vuaxemohinh.pxwm1w9.mongodb.net/vuaxemohinh?retryWrites=true&w=majority&appName=vuaxemohinh
```

**⚠️ IMPORTANT: Only ONE @ symbol after credentials!**

### 2. JWT Configuration

```
JWT_SECRET = vuaxemohinh-super-secret-jwt-key-2024-minimum-32-characters
NODE_ENV = production
```

### 3. CORS Configuration

```
CORS_ORIGIN = https://frontend-8pc72v8kq-dev-eb0dacb6.vercel.app
```

---

## Frontend Environment Variables

Add these in your Vercel frontend project dashboard:

```
NEXT_PUBLIC_API_URL = https://backend-3ftq4jnuh-dev-eb0dacb6.vercel.app
NEXTAUTH_SECRET = vuaxemohinh-nextauth-secret-key-2024-minimum-32-characters
NEXTAUTH_URL = https://frontend-8pc72v8kq-dev-eb0dacb6.vercel.app
```

### 5. Optional Email Configuration

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-app-password
```

## How to Set Environment Variables in Vercel

### Method 1: Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** tab
4. Click **Environment Variables**
5. Add each variable:
   - **Name**: Variable name (e.g., `MONGODB_URI`)
   - **Value**: Variable value
   - **Environment**: Select `Production`, `Preview`, and `Development`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add JWT_EXPIRES_IN
vercel env add NODE_ENV
vercel env add FRONTEND_URL
```

### Method 3: Bulk Import

Create a `.env.production` file and import:

```bash
vercel env pull .env.production
```

## Important Notes

1. **MongoDB Atlas**: Make sure to:

   - Whitelist Vercel IPs (or use 0.0.0.0/0 for all IPs)
   - Create a database user with read/write permissions
   - Use the connection string format with retryWrites=true

2. **JWT_SECRET**:

   - Never use the same secret in development and production
   - Generate a new one for production if needed

3. **CORS Configuration**:

   - Update FRONTEND_URL with your actual frontend Vercel URL
   - Make sure your frontend domain is allowed in CORS

4. **Environment Scope**:
   - Set variables for `Production`, `Preview`, and `Development`
   - Use different values for different environments if needed

## After Setting Variables

1. **Redeploy your backend**: `vercel --prod`
2. **Test the deployment**: Check logs for any connection issues
3. **Verify JWT**: Test authentication endpoints
4. **Check MongoDB**: Ensure database connection works

## Troubleshooting

- **MongoDB Connection Failed**: Check IP whitelist and credentials
- **JWT Errors**: Verify JWT_SECRET is properly set
- **CORS Issues**: Update FRONTEND_URL to match your frontend domain
- **Port Issues**: Vercel automatically assigns ports, don't hardcode PORT in your main.ts
