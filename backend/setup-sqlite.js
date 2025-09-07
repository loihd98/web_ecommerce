const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const path = require("path");

// SQLite Database setup
const dbPath = path.join(__dirname, "ecommerce.db");
const db = new Database(dbPath);

async function setupSQLiteDatabase() {
  try {
    console.log("🔌 Setting up SQLite database...");

    // Enable foreign keys
    db.exec("PRAGMA foreign_keys = ON;");

    // Create tables
    console.log("📦 Creating tables...");

    // Users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        role TEXT DEFAULT 'customer',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Categories table
    db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Products table
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        discountPrice REAL,
        stock INTEGER DEFAULT 0,
        images TEXT,
        categoryId INTEGER,
        isActive INTEGER DEFAULT 1,
        isFeatured INTEGER DEFAULT 0,
        tags TEXT,
        sku TEXT,
        weight REAL,
        attributes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
      );
    `);

    // Orders table
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        shippingAddress TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    console.log("✅ Tables created successfully!");

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const customerPassword = await bcrypt.hash("customer123", 10);
    const demoPassword = await bcrypt.hash("demo123", 10);

    // Create demo users
    console.log("👤 Creating demo users...");

    const insertUser = db.prepare(`
      INSERT OR REPLACE INTO users (email, password, firstName, lastName, role) 
      VALUES (?, ?, ?, ?, ?)
    `);

    insertUser.run(
      "admin@ecommerce.com",
      adminPassword,
      "Admin",
      "User",
      "admin"
    );
    insertUser.run(
      "demo@customer.com",
      customerPassword,
      "Demo",
      "Customer",
      "customer"
    );
    insertUser.run("test@user.com", demoPassword, "Test", "User", "customer");

    console.log("✅ Demo users created successfully!");

    // Create categories
    console.log("📂 Creating categories...");

    const insertCategory = db.prepare(`
      INSERT OR REPLACE INTO categories (id, name, description) 
      VALUES (?, ?, ?)
    `);

    insertCategory.run(1, "Electronics", "Electronic devices and gadgets");
    insertCategory.run(2, "Clothing", "Fashion and apparel");
    insertCategory.run(
      3,
      "Home & Garden",
      "Home improvement and garden supplies"
    );
    insertCategory.run(4, "Sports", "Sports equipment and fitness gear");
    insertCategory.run(5, "Books", "Books and educational materials");

    console.log("✅ Categories created successfully!");

    // Create sample products
    console.log("📦 Creating sample products...");

    const insertProduct = db.prepare(`
      INSERT OR REPLACE INTO products (id, name, description, price, stock, images, categoryId, isFeatured) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProduct.run(
      1,
      "Laptop Pro",
      "High-performance laptop for professionals",
      999.99,
      50,
      "laptop.jpg",
      1,
      1
    );
    insertProduct.run(
      2,
      "Smartphone X",
      "Latest smartphone with advanced features",
      699.99,
      100,
      "phone.jpg",
      1,
      1
    );
    insertProduct.run(
      3,
      "Designer T-Shirt",
      "Premium cotton t-shirt",
      29.99,
      200,
      "tshirt.jpg",
      2
    );
    insertProduct.run(
      4,
      "Running Shoes",
      "Comfortable running shoes",
      89.99,
      75,
      "shoes.jpg",
      4
    );
    insertProduct.run(
      5,
      "Coffee Table",
      "Modern wooden coffee table",
      199.99,
      25,
      "table.jpg",
      3
    );
    insertProduct.run(
      6,
      "Wireless Headphones",
      "Premium noise-canceling headphones",
      199.99,
      80,
      "headphones.jpg",
      1
    );
    insertProduct.run(
      7,
      "Winter Jacket",
      "Warm winter jacket for cold weather",
      129.99,
      60,
      "jacket.jpg",
      2
    );
    insertProduct.run(
      8,
      "Yoga Mat",
      "Non-slip yoga mat for exercise",
      39.99,
      120,
      "yogamat.jpg",
      4
    );

    console.log("✅ Sample products created successfully!");

    console.log("\n🎉 SQLite Database setup completed successfully!");
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
    console.log("   Type:     SQLite");
    console.log("   File:     ecommerce.db");
    console.log("   Location: " + dbPath);

    console.log("\n✅ Database file created at: " + dbPath);
    console.log("\n✅ You can now start your application:");
    console.log("   Backend:  npm run start:dev");
    console.log("   Frontend: npm run dev");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
  } finally {
    db.close();
  }
}

// Run setup
setupSQLiteDatabase().catch(console.error);
