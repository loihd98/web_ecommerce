import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

const dataSource = new DataSource({
  type: "sqlite",
  database: "ecommerce.db",
  entities: [__dirname + "/src/**/*.entity{.ts,.js}"],
  synchronize: false,
});

async function createDemoAccounts() {
  try {
    await dataSource.initialize();
    console.log("🔗 Connected to database");

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const customerPassword = await bcrypt.hash("customer123", 10);
    const demoPassword = await bcrypt.hash("demo123", 10);

    // Create demo accounts
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
          "SELECT * FROM users WHERE email = ?",
          [account.email]
        );

        if (existingUser.length > 0) {
          console.log(`⚠️  User ${account.email} already exists, skipping...`);
          continue;
        }

        // Insert new user
        await dataSource.query(
          `
          INSERT INTO users (email, password, firstName, lastName, role, phone, address, isActive, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        `,
          [
            account.email,
            account.password,
            account.firstName,
            account.lastName,
            account.role,
            account.phone,
            account.address,
            1,
          ]
        );

        console.log(`✅ Created ${account.role}: ${account.email}`);
      } catch (error) {
        console.error(`❌ Error creating ${account.email}:`, error.message);
      }
    }

    console.log("\n🎉 Demo accounts created successfully!\n");

    // Display account information
    console.log("📋 DEMO ACCOUNTS:");
    console.log("================");
    console.log("");
    console.log("🔑 ADMIN ACCOUNT:");
    console.log("   Email: admin@ecommerce.com");
    console.log("   Password: admin123");
    console.log("   Access: Full admin panel access");
    console.log("");
    console.log("👤 CUSTOMER ACCOUNTS:");
    console.log("   Email: demo@customer.com");
    console.log("   Password: customer123");
    console.log("");
    console.log("   Email: test@user.com");
    console.log("   Password: demo123");
    console.log("");
    console.log("🚀 You can now login with these credentials!");
    console.log("   Frontend: http://localhost:3000/login");
    console.log("   Admin Panel: http://localhost:3000/admin");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await dataSource.destroy();
  }
}

createDemoAccounts();
