const { Client } = require("pg");
const bcrypt = require("bcrypt");

// Database configuration
const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password123",
  database: "ecommerce_db",
};

async function setupDatabase() {
  const client = new Client(dbConfig);

  try {
    console.log("🔌 Connecting to PostgreSQL database...");
    await client.connect();
    console.log("✅ Connected to database successfully!");

    // Create tables
    console.log("📦 Creating tables...");

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock INTEGER DEFAULT 0,
        image VARCHAR(255),
        "categoryId" INTEGER REFERENCES categories(id),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        total DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        "shippingAddress" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Tables created successfully!");

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const customerPassword = await bcrypt.hash("customer123", 10);
    const demoPassword = await bcrypt.hash("demo123", 10);

    // Create demo users
    console.log("👤 Creating demo users...");

    try {
      // Admin user
      await client.query(
        `
        INSERT INTO users (email, password, name, role) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT (email) DO UPDATE SET 
        password = $2, name = $3, role = $4
      `,
        ["admin@ecommerce.com", adminPassword, "Admin User", "admin"]
      );

      // Customer users
      await client.query(
        `
        INSERT INTO users (email, password, name, role) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT (email) DO UPDATE SET 
        password = $2, name = $3, role = $4
      `,
        ["demo@customer.com", customerPassword, "Demo Customer", "customer"]
      );

      await client.query(
        `
        INSERT INTO users (email, password, name, role) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT (email) DO UPDATE SET 
        password = $2, name = $3, role = $4
      `,
        ["test@user.com", demoPassword, "Test User", "customer"]
      );

      console.log("✅ Demo users created successfully!");
    } catch (userError) {
      console.log("ℹ️ Users already exist, updated passwords");
    }

    // Create categories
    console.log("📂 Creating categories...");
    try {
      await client.query(`
        INSERT INTO categories (name, description) VALUES 
        ('Electronics', 'Electronic devices and gadgets'),
        ('Clothing', 'Fashion and apparel'),
        ('Home & Garden', 'Home improvement and garden supplies'),
        ('Sports', 'Sports equipment and fitness gear'),
        ('Books', 'Books and educational materials')
        ON CONFLICT DO NOTHING
      `);
      console.log("✅ Categories created successfully!");
    } catch (catError) {
      console.log("ℹ️ Categories already exist");
    }

    // Create sample products
    console.log("📦 Creating sample products...");
    try {
      await client.query(`
        INSERT INTO products (name, description, price, stock, image, "categoryId") VALUES 
        ('Laptop Pro', 'High-performance laptop for professionals', 999.99, 50, 'laptop.jpg', 1),
        ('Smartphone X', 'Latest smartphone with advanced features', 699.99, 100, 'phone.jpg', 1),
        ('Designer T-Shirt', 'Premium cotton t-shirt', 29.99, 200, 'tshirt.jpg', 2),
        ('Running Shoes', 'Comfortable running shoes', 89.99, 75, 'shoes.jpg', 4),
        ('Coffee Table', 'Modern wooden coffee table', 199.99, 25, 'table.jpg', 3)
        ON CONFLICT DO NOTHING
      `);
      console.log("✅ Sample products created successfully!");
    } catch (prodError) {
      console.log("ℹ️ Products already exist");
    }

    console.log("\n🎉 Database setup completed successfully!");
    console.log("\n" + "=".repeat(50));
    console.log("📋 LOGIN CREDENTIALS");
    console.log("=".repeat(50));
    console.log("\n🔐 ADMIN ACCOUNT:");
    console.log("   Email:    admin@ecommerce.com");
    console.log("   Password: admin123");
    console.log("   Role:     Admin");
    console.log("   Access:   Full admin panel");
    console.log("   URL:      http://localhost:3000/admin");

    console.log("\n👤 CUSTOMER ACCOUNTS:");
    console.log("   Email:    demo@customer.com");
    console.log("   Password: customer123");
    console.log("   Role:     Customer");

    console.log("\n   Email:    test@user.com");
    console.log("   Password: demo123");
    console.log("   Role:     Customer");

    console.log("\n" + "=".repeat(50));
    console.log("🗄️ DATABASE CONNECTION INFO");
    console.log("=".repeat(50));
    console.log("   Host:     localhost");
    console.log("   Port:     5432");
    console.log("   Database: ecommerce_db");
    console.log("   Username: postgres");
    console.log("   Password: password123");
    console.log("\n✅ You can now start your application:");
    console.log("   Backend:  npm run start:dev");
    console.log("   Frontend: npm run dev");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);

    if (error.code === "ECONNREFUSED") {
      console.log("\n💡 PostgreSQL Connection Failed!");
      console.log("   Please ensure PostgreSQL is installed and running:");
      console.log(
        "   1. Install PostgreSQL from: https://www.postgresql.org/download/windows/"
      );
      console.log("   2. Set postgres user password to: password123");
      console.log("   3. Create database: ecommerce_db");
      console.log("   4. Start PostgreSQL service");
      console.log(
        "\n   Or use SQLite for quick testing (see DATABASE_SETUP.md)"
      );
    }
  } finally {
    await client.end();
  }
}

// Run setup
setupDatabase().catch(console.error);
