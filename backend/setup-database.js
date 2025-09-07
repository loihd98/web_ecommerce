import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

// Database configuration
const { DataSource } = require("typeorm");
const bcrypt = require("bcrypt");

// Database configuration
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password123",
  database: "ecommerce_db",
  synchronize: true,
  entities: [__dirname + "/src/**/*.entity{.ts,.js}"],
  logging: false,
});

async function setupDatabaseAndAccounts() {
  try {
    console.log("🔗 Connecting to PostgreSQL database...");
    await dataSource.initialize();
    console.log("✅ Connected to database successfully!");

    // The synchronize option will automatically create tables based on entities
    console.log("📊 Database tables created/updated automatically");

    // Create demo accounts
    const adminPassword = await bcrypt.hash("admin123", 10);
    const customerPassword = await bcrypt.hash("customer123", 10);
    const demoPassword = await bcrypt.hash("demo123", 10);

    const accounts = [
      {
        email: "admin@ecommerce.com",
        password: adminPassword,
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        phone: "+84 123 456 789",
        address: "123 Admin Street, Ho Chi Minh City",
      },
      {
        email: "demo@customer.com",
        password: customerPassword,
        firstName: "Demo",
        lastName: "Customer",
        role: "customer",
        phone: "+84 987 654 321",
        address: "456 Customer Avenue, Hanoi",
      },
      {
        email: "test@user.com",
        password: demoPassword,
        firstName: "Test",
        lastName: "User",
        role: "customer",
        phone: "+84 555 666 777",
        address: "789 Test Road, Da Nang",
      },
    ];

    console.log("👥 Creating demo accounts...");

    for (const account of accounts) {
      try {
        // Check if user already exists
        const existingUser = await dataSource.query(
          "SELECT * FROM users WHERE email = $1",
          [account.email]
        );

        if (existingUser.length > 0) {
          console.log(`⚠️  User ${account.email} already exists, skipping...`);
          continue;
        }

        // Insert new user
        await dataSource.query(
          `
          INSERT INTO users (email, password, "firstName", "lastName", role, phone, address, "isActive", "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        `,
          [
            account.email,
            account.password,
            account.firstName,
            account.lastName,
            account.role,
            account.phone,
            account.address,
            true,
          ]
        );

        console.log(`✅ Created ${account.role}: ${account.email}`);
      } catch (error) {
        console.error(`❌ Error creating ${account.email}:`, error.message);
      }
    }

    // Create sample categories
    console.log("📂 Creating sample categories...");
    const categories = [
      { name: "Electronics", description: "Electronic devices and gadgets" },
      { name: "Clothing", description: "Fashion and apparel" },
      { name: "Books", description: "Books and educational materials" },
      { name: "Home & Garden", description: "Home improvement and gardening" },
    ];

    for (const category of categories) {
      try {
        const existingCategory = await dataSource.query(
          "SELECT * FROM categories WHERE name = $1",
          [category.name]
        );

        if (existingCategory.length === 0) {
          await dataSource.query(
            `
            INSERT INTO categories (name, description, "createdAt", "updatedAt")
            VALUES ($1, $2, NOW(), NOW())
          `,
            [category.name, category.description]
          );
          console.log(`✅ Created category: ${category.name}`);
        }
      } catch (error) {
        console.error(
          `❌ Error creating category ${category.name}:`,
          error.message
        );
      }
    }

    // Create sample products
    console.log("📦 Creating sample products...");
    const products = [
      {
        name: "iPhone 15 Pro",
        description: "Latest iPhone with advanced features",
        price: 999.99,
        stock: 50,
        categoryId: 1,
        image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
      },
      {
        name: "Samsung Galaxy S24",
        description: "Powerful Android smartphone",
        price: 899.99,
        stock: 30,
        categoryId: 1,
        image: "https://via.placeholder.com/300x300?text=Galaxy+S24",
      },
      {
        name: "Nike Air Max",
        description: "Comfortable running shoes",
        price: 129.99,
        stock: 100,
        categoryId: 2,
        image: "https://via.placeholder.com/300x300?text=Nike+Air+Max",
      },
    ];

    for (const product of products) {
      try {
        const existingProduct = await dataSource.query(
          "SELECT * FROM products WHERE name = $1",
          [product.name]
        );

        if (existingProduct.length === 0) {
          await dataSource.query(
            `
            INSERT INTO products (name, description, price, stock, "categoryId", image, "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
          `,
            [
              product.name,
              product.description,
              product.price,
              product.stock,
              product.categoryId,
              product.image,
            ]
          );
          console.log(`✅ Created product: ${product.name}`);
        }
      } catch (error) {
        console.error(
          `❌ Error creating product ${product.name}:`,
          error.message
        );
      }
    }

    console.log("\n🎉 Database setup completed successfully!\n");

    // Display configuration information
    console.log("═══════════════════════════════════════════════");
    console.log("         🗄️  DATABASE CONFIGURATION");
    console.log("═══════════════════════════════════════════════");
    console.log(`Database Type: PostgreSQL`);
    console.log(`Host: ${process.env.DB_HOST || "localhost"}`);
    console.log(`Port: ${process.env.DB_PORT || "5432"}`);
    console.log(`Database: ${process.env.DB_NAME || "ecommerce_db"}`);
    console.log(`Username: ${process.env.DB_USERNAME || "postgres"}`);
    console.log(`Password: ${process.env.DB_PASSWORD || "password123"}`);
    console.log("");
    console.log("═══════════════════════════════════════════════");
    console.log("           🔑 LOGIN CREDENTIALS");
    console.log("═══════════════════════════════════════════════");
    console.log("");
    console.log("🔐 ADMIN ACCOUNT:");
    console.log("   Email: admin@ecommerce.com");
    console.log("   Password: admin123");
    console.log("   Access: Full admin panel access");
    console.log("   URL: http://localhost:3000/admin");
    console.log("");
    console.log("👤 CUSTOMER ACCOUNTS:");
    console.log("   Email: demo@customer.com");
    console.log("   Password: customer123");
    console.log("");
    console.log("   Email: test@user.com");
    console.log("   Password: demo123");
    console.log("");
    console.log("🌐 APPLICATION URLS:");
    console.log("   Frontend: http://localhost:3000");
    console.log("   Backend API: http://localhost:5000/api");
    console.log("   API Documentation: http://localhost:5000/api-docs");
    console.log("");
    console.log("═══════════════════════════════════════════════");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    console.log("");
    console.log("🔧 TROUBLESHOOTING STEPS:");
    console.log("1. Make sure PostgreSQL is installed and running");
    console.log("2. Create the database: createdb ecommerce_db");
    console.log("3. Update .env file with correct database credentials");
    console.log("4. Install PostgreSQL: https://www.postgresql.org/download/");
  } finally {
    await dataSource.destroy();
  }
}

setupDatabaseAndAccounts();
