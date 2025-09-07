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

    // Clear existing data in order (products first due to foreign key constraints)
    try {
      await productsService.deleteAll();
      console.log("✅ Existing products cleared");
    } catch (error) {
      console.log("ℹ️ No existing products to clear");
    }

    try {
      await categoriesService.deleteAll();
      console.log("✅ Existing categories cleared");
    } catch (error) {
      console.log("ℹ️ No existing categories to clear");
    }

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
      phone: "0342429911",
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
    const categoriesData = [
      {
        name: "Xe Thể Thao",
        description: "Mô hình xe thể thao cao cấp và siêu xe",
        image: "/images/categories/sports-cars.jpg",
        isActive: true,
      },
      {
        name: "Xe Cổ Điển",
        description: "Bộ sưu tập xe cổ điển và vintage",
        image: "/images/categories/classic-cars.jpg",
        isActive: true,
      },
      {
        name: "Xe Đua",
        description: "Mô hình xe đua F1, NASCAR và Le Mans",
        image: "/images/categories/racing-cars.jpg",
        isActive: true,
      },
      {
        name: "Xe Sang",
        description: "Xe sang trọng và limousine",
        image: "/images/categories/luxury-cars.jpg",
        isActive: true,
      },
      {
        name: "Xe Tải & Truck",
        description: "Mô hình xe tải, container và truck",
        image: "/images/categories/trucks.jpg",
        isActive: true,
      },
      {
        name: "Xe Mô Tô",
        description: "Bộ sưu tập mô hình xe mô tô và motor",
        image: "/images/categories/motorcycles.jpg",
        isActive: true,
      },
    ];
    const createdCategories = [];
    for (const category of categoriesData) {
      const created = await categoriesService.create(category);
      createdCategories.push(created);
      console.log("✅ Category created:", created.name);
    }

    // Create products
    const products = [
      {
        name: "Lamborghini Aventador LP 700-4 1:18",
        description:
          "Mô hình siêu xe Lamborghini Aventador tỷ lệ 1:18 với chi tiết hoàn hảo, cửa mở được và nội thất tinh xảo.",
        price: 2850000,
        discountPrice: 2650000,
        stock: 15,
        images: ["/images/products/lamborghini-aventador.jpg"],
        categoryId: createdCategories[0].id, // Xe Thể Thao
        isActive: true,
        isFeatured: true,
        tags: ["lamborghini", "aventador", "sports-car", "diecast"],
        sku: "LAM001",
        weight: 1.2,
        attributes: {
          scale: "1:18",
          brand: "Maisto",
          material: "Die-cast",
          doors: "Opening",
        },
      },
      {
        name: "Ferrari 458 Italia 1:24",
        description:
          "Mô hình Ferrari 458 Italia tỷ lệ 1:24 với màu đỏ Ferrari truyền thống và chi tiết engine bay.",
        price: 1650000,
        discountPrice: 1450000,
        stock: 25,
        images: ["/images/products/ferrari-458.jpg"],
        categoryId: createdCategories[0].id, // Xe Thể Thao
        isActive: true,
        isFeatured: true,
        tags: ["ferrari", "458", "italia", "red"],
        sku: "FER001",
        weight: 0.8,
        attributes: {
          scale: "1:24",
          brand: "Bburago",
          material: "Die-cast",
          color: "Rosso Corsa Red",
        },
      },
      {
        name: "Porsche 911 Turbo S 1:18",
        description:
          "Mô hình Porsche 911 Turbo S tỷ lệ 1:18 với động cơ chi tiết và hệ thống treo chân thực.",
        price: 3250000,
        discountPrice: 2950000,
        stock: 40,
        images: ["/images/products/porsche-911.jpg"],
        categoryId: createdCategories[0].id, // Xe Thể Thao
        isActive: true,
        isFeatured: false,
        tags: ["porsche", "911", "turbo", "german"],
        sku: "POR001",
        weight: 1.1,
        attributes: {
          scale: "1:18",
          brand: "Autoart",
          material: "Die-cast",
          engine: "Detailed",
        },
      },
      {
        name: "Mercedes-Benz 300SL Gullwing 1:18",
        description:
          "Mô hình Mercedes-Benz 300SL Gullwing classic với cửa cánh chim đặc trưng và nội thất da thật.",
        price: 4200000,
        discountPrice: 3890000,
        stock: 18,
        images: ["/images/products/mercedes-300sl.jpg"],
        categoryId: createdCategories[1].id, // Xe Cổ Điển
        isActive: true,
        isFeatured: true,
        tags: ["mercedes", "300sl", "gullwing", "classic"],
        sku: "MER001",
        weight: 1.3,
        attributes: {
          scale: "1:18",
          brand: "CMC",
          material: "Die-cast",
          year: "1955",
        },
      },
      {
        name: "BMW M3 E30 DTM 1:18",
        description:
          "Mô hình BMW M3 E30 DTM racing với livery đua chuyên nghiệp và roll cage chi tiết.",
        price: 2800000,
        discountPrice: 2490000,
        images: ["/images/products/bmw-m3.jpg"],
        categoryId: createdCategories[2].id, // Xe Đua
        isActive: true,
        isFeatured: false,
        tags: ["bmw", "m3", "dtm", "racing"],
        sku: "BMW001",
        weight: 1.0,
        attributes: {
          scale: "1:18",
          brand: "Minichamps",
          material: "Die-cast",
          racing: "DTM",
        },
      },
      {
        name: "Rolls-Royce Phantom VIII 1:18",
        description:
          "Mô hình Rolls-Royce Phantom VIII siêu sang với nội thất da cao cấp và chi tiết mạ chrome.",
        price: 5200000,
        discountPrice: 4990000,
        stock: 22,
        images: ["/images/products/rolls-royce.jpg"],
        categoryId: createdCategories[3].id, // Xe Sang
        isActive: true,
        isFeatured: true,
        tags: ["rolls-royce", "phantom", "luxury", "british"],
        sku: "RR001",
        weight: 1.5,
        attributes: {
          scale: "1:18",
          brand: "Kyosho",
          material: "Die-cast",
          interior: "Leather",
        },
      },
      {
        name: "Ford F-150 Raptor 1:24",
        description:
          "Mô hình Ford F-150 Raptor off-road với hệ thống treo cao và lốp địa hình chi tiết.",
        price: 1200000,
        discountPrice: 1090000,
        stock: 8,
        images: ["/images/products/ford-raptor.jpg"],
        categoryId: createdCategories[4].id, // Xe Tải & Truck
        isActive: true,
        isFeatured: true,
        tags: ["ford", "f150", "raptor", "truck"],
        sku: "FOR001",
        weight: 0.9,
        attributes: {
          scale: "1:24",
          brand: "Maisto",
          material: "Die-cast",
          type: "Off-road",
        },
      },
      {
        name: "Peterbilt 379 Semi Truck 1:32",
        description:
          "Mô hình xe đầu kéo Peterbilt 379 classic với cabin chi tiết và trailer container.",
        price: 1680000,
        discountPrice: 1590000,
        stock: 35,
        images: ["/images/products/peterbilt.jpg"],
        categoryId: createdCategories[4].id, // Xe Tải & Truck
        isActive: true,
        isFeatured: false,
        tags: ["peterbilt", "semi", "truck", "trailer"],
        sku: "PET001",
        weight: 1.1,
        attributes: {
          scale: "1:32",
          brand: "NewRay",
          material: "Die-cast",
          trailer: "Included",
        },
      },
      {
        name: "Harley-Davidson Street Glide 1:12",
        description:
          "Mô hình Harley-Davidson Street Glide với chi tiết động cơ V-Twin và hệ thống ống xả chrome.",
        price: 2950000,
        discountPrice: 2850000,
        stock: 28,
        images: ["/images/products/harley-davidson.jpg"],
        categoryId: createdCategories[5].id, // Xe Mô Tô
        isActive: true,
        isFeatured: false,
        tags: ["harley", "davidson", "motorcycle", "cruiser"],
        sku: "HAR001",
        weight: 0.8,
        attributes: {
          scale: "1:12",
          brand: "Maisto",
          material: "Die-cast",
          engine: "V-Twin",
        },
      },
      {
        name: "Ducati Panigale V4 S 1:12",
        description:
          "Mô hình Ducati Panigale V4 S superbike với chi tiết động cơ V4 và hệ thống treo Öhlins.",
        price: 3480000,
        discountPrice: 3290000,
        stock: 12,
        images: ["/images/products/ducati-panigale.jpg"],
        categoryId: createdCategories[5].id, // Xe Mô Tô
        isActive: true,
        isFeatured: true,
        tags: ["ducati", "panigale", "v4", "superbike"],
        sku: "DUC001",
        weight: 0.7,
        attributes: {
          scale: "1:12",
          brand: "NewRay",
          material: "Die-cast",
          engine: "V4",
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
