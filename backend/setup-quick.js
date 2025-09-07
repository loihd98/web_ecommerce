const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");

async function setupDatabase() {
  try {
    console.log("🔌 Setting up SQLite database...");

    const db = new Database("ecommerce_simple.db");

    // Enable foreign keys
    db.exec("PRAGMA foreign_keys = ON;");

    console.log("📦 Creating tables...");

    // Users table - simplified to match what we need
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        role TEXT DEFAULT 'customer',
        image TEXT
      );
    `);

    // Categories table
    db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );
    `);

    // Products table - simplified
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0,
        images TEXT,
        categoryId INTEGER,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
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
      INSERT OR REPLACE INTO users (email, password, firstName, lastName, role, image) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Default avatar URLs
    const adminAvatar =
      "https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff&size=128";
    const demoAvatar =
      "https://ui-avatars.com/api/?name=Demo+Customer&background=10b981&color=fff&size=128";
    const testAvatar =
      "https://ui-avatars.com/api/?name=Test+User&background=8b5cf6&color=fff&size=128";

    insertUser.run(
      "admin@ecommerce.com",
      adminPassword,
      "Admin",
      "User",
      "admin",
      adminAvatar
    );
    insertUser.run(
      "demo@customer.com",
      customerPassword,
      "Demo",
      "Customer",
      "customer",
      demoAvatar
    );
    insertUser.run(
      "test@user.com",
      demoPassword,
      "Test",
      "User",
      "customer",
      testAvatar
    );

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
      INSERT OR REPLACE INTO products (id, name, description, price, stock, images, categoryId) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    // Product placeholder images
    const laptopImg =
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop";
    const phoneImg =
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop";
    const tshirtImg =
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop";
    const shoesImg =
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop";
    const tableImg =
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop";

    insertProduct.run(
      1,
      "Laptop Pro",
      "High-performance laptop for professionals",
      999.99,
      50,
      laptopImg,
      1
    );
    insertProduct.run(
      2,
      "Smartphone X",
      "Latest smartphone with advanced features",
      699.99,
      100,
      phoneImg,
      1
    );
    insertProduct.run(
      3,
      "Designer T-Shirt",
      "Premium cotton t-shirt",
      29.99,
      200,
      tshirtImg,
      2
    );
    insertProduct.run(
      4,
      "Running Shoes",
      "Comfortable running shoes",
      89.99,
      75,
      shoesImg,
      4
    );
    insertProduct.run(
      5,
      "Coffee Table",
      "Modern wooden coffee table",
      199.99,
      25,
      tableImg,
      3
    );

    console.log("✅ Sample products created successfully!");

    db.close();

    console.log("\n🎉 Database setup completed successfully!");
    console.log("\n" + "=".repeat(60));
    console.log("📋 LOGIN CREDENTIALS");
    console.log("=".repeat(60));
    console.log("\n🔐 ADMIN ACCOUNT:");
    console.log("   📧 Email:    admin@ecommerce.com");
    console.log("   🔑 Password: admin123");
    console.log("   👨‍💼 Role:     Admin");
    console.log("   🌐 URL:      http://localhost:3000/admin");

    console.log("\n👤 CUSTOMER ACCOUNTS:");
    console.log("   📧 Email:    demo@customer.com");
    console.log("   🔑 Password: customer123");

    console.log("   📧 Email:    test@user.com");
    console.log("   🔑 Password: demo123");

    console.log("\n" + "=".repeat(60));
    console.log("🗄️ DATABASE CONNECTION INFO");
    console.log("=".repeat(60));
    console.log("   📁 Type:     SQLite");
    console.log("   📄 File:     ecommerce_simple.db");
    console.log(
      "   📍 Path:     " + require("path").resolve("ecommerce_simple.db")
    );

    console.log("\n✅ NEXT STEPS:");
    console.log("   1️⃣ Update .env: DB_DATABASE=ecommerce_simple.db");
    console.log("   2️⃣ Start backend: npm run start:dev");
    console.log("   3️⃣ Start frontend: npm run dev");
    console.log("   4️⃣ Visit: http://localhost:3000/admin");
    console.log("\n🚀 Your e-commerce platform is ready!");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
  }
}

// Run setup
setupDatabase().catch(console.error);
