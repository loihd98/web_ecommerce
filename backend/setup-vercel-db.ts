// Vercel Postgres Database Setup Script
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

async function setupVercelDatabase() {
  try {
    console.log("🔌 Setting up Vercel Postgres database...");

    // Create Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        address TEXT,
        role VARCHAR(50) DEFAULT 'customer',
        "isActive" BOOLEAN DEFAULT true,
        "socialProvider" VARCHAR(255),
        "socialProviderId" VARCHAR(255),
        image VARCHAR(500),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create Categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create Products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        "discountPrice" DECIMAL(10,2),
        stock INTEGER DEFAULT 0,
        images TEXT[],
        "categoryId" INTEGER REFERENCES categories(id),
        "isActive" BOOLEAN DEFAULT true,
        "isFeatured" BOOLEAN DEFAULT false,
        tags TEXT[],
        sku VARCHAR(255),
        weight DECIMAL(3,2),
        attributes JSONB,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create Orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        total DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        "shippingAddress" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log("✅ Tables created successfully!");

    // Hash passwords for demo users
    const adminPassword = await bcrypt.hash("admin123", 10);
    const customerPassword = await bcrypt.hash("customer123", 10);
    const demoPassword = await bcrypt.hash("demo123", 10);

    // Demo user avatars
    const adminAvatar =
      "https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff&size=128";
    const demoAvatar =
      "https://ui-avatars.com/api/?name=Demo+Customer&background=10b981&color=fff&size=128";
    const testAvatar =
      "https://ui-avatars.com/api/?name=Test+User&background=8b5cf6&color=fff&size=128";

    // Insert demo users
    console.log("👤 Creating demo users...");

    await sql`
      INSERT INTO users (email, password, "firstName", "lastName", role, image) 
      VALUES 
        (${`admin@ecommerce.com`}, ${adminPassword}, ${"Admin"}, ${"User"}, ${"admin"}, ${adminAvatar}),
        (${`demo@customer.com`}, ${customerPassword}, ${"Demo"}, ${"Customer"}, ${"customer"}, ${demoAvatar}),
        (${`test@user.com`}, ${demoPassword}, ${"Test"}, ${"User"}, ${"customer"}, ${testAvatar})
      ON CONFLICT (email) DO UPDATE SET 
        password = EXCLUDED.password,
        image = EXCLUDED.image;
    `;

    // Insert categories
    console.log("📂 Creating categories...");

    await sql`
      INSERT INTO categories (id, name, description) VALUES 
        (1, 'Electronics', 'Electronic devices and gadgets'),
        (2, 'Clothing', 'Fashion and apparel'),
        (3, 'Home & Garden', 'Home improvement and garden supplies'),
        (4, 'Sports', 'Sports equipment and fitness gear'),
        (5, 'Books', 'Books and educational materials')
      ON CONFLICT (id) DO UPDATE SET 
        name = EXCLUDED.name,
        description = EXCLUDED.description;
    `;

    // Insert products with proper image URLs
    console.log("📦 Creating sample products...");

    const products = [
      {
        id: 1,
        name: "Laptop Pro",
        description: "High-performance laptop for professionals",
        price: 999.99,
        stock: 50,
        images: [
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        ],
        categoryId: 1,
        isFeatured: true,
      },
      {
        id: 2,
        name: "Smartphone X",
        description: "Latest smartphone with advanced features",
        price: 699.99,
        stock: 100,
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        ],
        categoryId: 1,
        isFeatured: true,
      },
      {
        id: 3,
        name: "Designer T-Shirt",
        description: "Premium cotton t-shirt",
        price: 29.99,
        stock: 200,
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        ],
        categoryId: 2,
        isFeatured: false,
      },
      {
        id: 4,
        name: "Running Shoes",
        description: "Comfortable running shoes",
        price: 89.99,
        stock: 75,
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        ],
        categoryId: 4,
        isFeatured: false,
      },
      {
        id: 5,
        name: "Coffee Table",
        description: "Modern wooden coffee table",
        price: 199.99,
        stock: 25,
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        ],
        categoryId: 3,
        isFeatured: false,
      },
    ];

    for (const product of products) {
      await sql`
        INSERT INTO products (id, name, description, price, stock, images, "categoryId", "isFeatured") 
        VALUES (
          ${product.id}, 
          ${product.name}, 
          ${product.description}, 
          ${product.price}, 
          ${product.stock}, 
          ${JSON.stringify(product.images)}, 
          ${product.categoryId}, 
          ${product.isFeatured}
        )
        ON CONFLICT (id) DO UPDATE SET 
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          stock = EXCLUDED.stock,
          images = EXCLUDED.images,
          "categoryId" = EXCLUDED."categoryId",
          "isFeatured" = EXCLUDED."isFeatured";
      `;
    }

    console.log("✅ All data created successfully!");

    console.log("\n🎉 Vercel Postgres setup completed!");
    console.log("\n" + "=".repeat(60));
    console.log("📋 LOGIN CREDENTIALS");
    console.log("=".repeat(60));
    console.log("\n🔐 ADMIN ACCOUNT:");
    console.log("   📧 Email:    admin@ecommerce.com");
    console.log("   🔑 Password: admin123");
    console.log("   👨‍💼 Role:     Admin");

    console.log("\n👤 CUSTOMER ACCOUNTS:");
    console.log("   📧 Email:    demo@customer.com");
    console.log("   🔑 Password: customer123");

    console.log("   📧 Email:    test@user.com");
    console.log("   🔑 Password: demo123");

    console.log("\n✅ Database ready for production!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    throw error;
  }
}

export default setupVercelDatabase;
