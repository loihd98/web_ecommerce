# 🗄️ Database Configuration Guide

## PostgreSQL Setup for Windows

### Step 1: Install PostgreSQL

1. **Download PostgreSQL:**

   - Go to https://www.postgresql.org/download/windows/
   - Download the latest version (16.x recommended)
   - Choose the Windows x86-64 installer

2. **Install PostgreSQL:**
   - Run the installer as Administrator
   - Set password for postgres user: `password123`
   - Remember this password - it's in your .env file
   - Default port: 5432 (keep this)
   - Install all components including pgAdmin

### Step 2: Create Database

Option A: Using pgAdmin (GUI)

1. Open pgAdmin 4
2. Connect to localhost server with password: `password123`
3. Right-click "Databases" → Create → Database
4. Name: `ecommerce_db`
5. Click Save

Option B: Using Command Line

```bash
# Open Command Prompt as Administrator
createdb -U postgres ecommerce_db
# Enter password when prompted: password123
```

### Step 3: Verify Connection

```bash
# Test connection
psql -U postgres -d ecommerce_db
# Enter password: password123
# You should see: ecommerce_db=#
# Type \q to quit
```

## Alternative: Quick SQLite Setup (For Testing)

If you want to quickly test without PostgreSQL:

1. **Update .env file:**

```env
DB_TYPE=sqlite
DB_DATABASE=ecommerce.db
# Comment out PostgreSQL settings
```

2. **Update app.module.ts:**

```typescript
TypeOrmModule.forRoot({
  type: "sqlite",
  database: "ecommerce.db",
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== "production",
}),
```

## Database Configuration Details

### Current Settings (.env file):

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password123
DB_NAME=ecommerce_db
```

### Connection String:

```
postgresql://postgres:password123@localhost:5432/ecommerce_db
```

## Run Database Setup

After PostgreSQL is installed and database is created:

```bash
cd backend
node setup-database.js
```

This will:

- ✅ Create all tables automatically
- ✅ Create demo user accounts
- ✅ Create sample categories and products
- ✅ Display login credentials

## Login Credentials

### 🔐 Admin Account:

- **Email:** admin@ecommerce.com
- **Password:** admin123
- **Access:** Full admin panel
- **URL:** http://localhost:3000/admin

### 👤 Customer Accounts:

- **Email:** demo@customer.com
- **Password:** customer123

- **Email:** test@user.com
- **Password:** demo123

## Troubleshooting

### PostgreSQL not starting:

```bash
# Windows - Start PostgreSQL service
net start postgresql-x64-16
```

### Connection refused:

1. Check if PostgreSQL is running
2. Verify port 5432 is not blocked
3. Check .env file credentials
4. Ensure database `ecommerce_db` exists

### Permission denied:

```bash
# Grant permissions
psql -U postgres
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO postgres;
```

## Production Database Options

For deployment, consider:

1. **Vercel Postgres** (Recommended for Vercel deployment)
2. **Supabase** (Free PostgreSQL hosting)
3. **Railway** (Simple PostgreSQL hosting)
4. **AWS RDS** (Enterprise solution)
5. **Google Cloud SQL** (Enterprise solution)

Update the .env file with production database credentials when deploying.
