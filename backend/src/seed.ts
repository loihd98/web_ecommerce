import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CategoriesService } from "./categories/categories.service";
import { ProductsService } from "./products/products.service";
import { UsersService } from "./users/users.service";
import * as bcrypt from "bcrypt";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductsService);
  const usersService = app.get(UsersService);

  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    try {
      await usersService.deleteAll();
      console.log("✅ Existing users cleared");
    } catch (error) {
      console.log("ℹ️ No existing users to clear");
    }

    // Create admin user (password will be hashed in the service)
    const adminUser = await usersService.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      phone: "0123456789",
      password: "admin123", // Raw password - will be hashed in service
      role: "admin",
    });
    console.log("✅ Admin user created:", adminUser.email);

    // Create sample user (password will be hashed in the service)
    const sampleUser = await usersService.create({
      firstName: "John",
      lastName: "Doe",
      email: "user@example.com",
      phone: "0987654321",
      password: "user123", // Raw password - will be hashed in service
      role: "customer",
    });
    console.log("✅ Sample user created:", sampleUser.email);

    // Create categories
    const categories = [
      {
        name: "Điện thoại",
        description: "Smartphone và thiết bị di động",
        image: "/category-phone.jpg",
        isActive: true,
      },
      {
        name: "Laptop",
        description: "Máy tính xách tay và phụ kiện",
        image: "/category-laptop.jpg",
        isActive: true,
      },
      {
        name: "Thời trang",
        description: "Quần áo và phụ kiện thời trang",
        image: "/category-fashion.jpg",
        isActive: true,
      },
      {
        name: "Gia dụng",
        description: "Đồ gia dụng và nội thất",
        image: "/category-home.jpg",
        isActive: true,
      },
      {
        name: "Sách",
        description: "Sách và văn phòng phẩm",
        image: "/category-books.jpg",
        isActive: true,
      },
    ];

    const createdCategories = [];
    for (const category of categories) {
      const created = await categoriesService.create(category);
      createdCategories.push(created);
      console.log("✅ Category created:", created.name);
    }

    // Create products
    const products = [
      {
        name: "iPhone 15 Pro Max 256GB",
        description:
          "iPhone 15 Pro Max là chiếc iPhone tiên tiến nhất từ trước đến nay với chip A17 Pro, camera chuyên nghiệp và khung titan cao cấp.",
        price: 29990000,
        discountPrice: 27990000,
        stock: 15,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[0].id,
        isActive: true,
        isFeatured: true,
        tags: ["apple", "iphone", "smartphone"],
        sku: "IP15PM256",
        weight: 0.22,
        attributes: {
          color: "Titan Tự Nhiên",
          storage: "256GB",
          screen: "6.7 inch",
          camera: "48MP",
        },
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        description:
          "Smartphone Android cao cấp với S Pen và camera 200MP, thiết kế premium và hiệu năng mạnh mẽ.",
        price: 31990000,
        discountPrice: 29990000,
        stock: 12,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[0].id,
        isActive: true,
        isFeatured: true,
        tags: ["samsung", "android", "smartphone"],
        sku: "SGS24U",
        weight: 0.23,
        attributes: {
          color: "Đen Titan",
          storage: "256GB",
          screen: "6.8 inch",
          camera: "200MP",
        },
      },
      {
        name: "MacBook Air M3 13 inch",
        description:
          "Laptop MacBook Air với chip M3 mạnh mẽ, pin cả ngày và thiết kế siêu mỏng.",
        price: 28990000,
        stock: 8,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[1].id,
        isActive: true,
        isFeatured: true,
        tags: ["apple", "macbook", "laptop"],
        sku: "MBAM313",
        weight: 1.24,
        attributes: {
          color: "Xám",
          memory: "8GB",
          storage: "256GB",
          screen: "13.6 inch",
        },
      },
      {
        name: "Dell XPS 13 Plus",
        description:
          "Laptop Dell cao cấp với thiết kế siêu mỏng, màn hình InfinityEdge và hiệu năng vượt trội.",
        price: 35990000,
        stock: 5,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[1].id,
        isActive: true,
        isFeatured: false,
        tags: ["dell", "laptop", "windows"],
        sku: "DELLXPS13",
        weight: 1.26,
        attributes: {
          color: "Bạc",
          processor: "Intel i7",
          memory: "16GB",
          storage: "512GB",
        },
      },
      {
        name: "Áo thun Premium Cotton",
        description:
          "Áo thun cao cấp chất liệu cotton 100%, thoáng mát và thấm hút mồ hôi tốt.",
        price: 299000,
        discountPrice: 199000,
        stock: 50,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[2].id,
        isActive: true,
        isFeatured: false,
        tags: ["fashion", "cotton", "tshirt"],
        sku: "AT001",
        weight: 0.2,
        attributes: {
          size: "M",
          color: "Trắng",
          material: "Cotton 100%",
        },
      },
      {
        name: "Nồi cơm điện Panasonic 1.8L",
        description:
          "Nồi cơm điện cao cấp với công nghệ nấu thông minh, giữ nhiệt tốt và tiết kiệm điện.",
        price: 2990000,
        discountPrice: 2490000,
        stock: 25,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[3].id,
        isActive: true,
        isFeatured: true,
        tags: ["home", "kitchen", "rice-cooker"],
        sku: "RC18P",
        weight: 3.5,
        attributes: {
          capacity: "1.8L",
          brand: "Panasonic",
          power: "700W",
        },
      },
      {
        name: "Lập trình Web với React",
        description:
          "Sách hướng dẫn lập trình web hiện đại với React, từ cơ bản đến nâng cao.",
        price: 299000,
        stock: 30,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[4].id,
        isActive: true,
        isFeatured: false,
        tags: ["book", "programming", "react"],
        sku: "BOOK001",
        weight: 0.5,
        attributes: {
          author: "Nguyễn Văn A",
          pages: "350",
          language: "Tiếng Việt",
        },
      },
      {
        name: "iPhone 15 Pro 128GB",
        description:
          "iPhone 15 Pro với chip A17 Pro, camera tiên tiến và thiết kế titan premium.",
        price: 24990000,
        discountPrice: 23990000,
        stock: 20,
        images: ["/placeholder-product.jpg"],
        categoryId: createdCategories[0].id,
        isActive: true,
        isFeatured: false,
        tags: ["apple", "iphone", "smartphone"],
        sku: "IP15P128",
        weight: 0.19,
        attributes: {
          color: "Titan Đen",
          storage: "128GB",
          screen: "6.1 inch",
          camera: "48MP",
        },
      },
    ];

    for (const product of products) {
      const created = await productsService.create(product);
      console.log("✅ Product created:", created.name);
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📋 Login credentials:");
    console.log("Admin: admin@example.com / admin123");
    console.log("User: user@example.com / user123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await app.close();
  }
}

seed();
