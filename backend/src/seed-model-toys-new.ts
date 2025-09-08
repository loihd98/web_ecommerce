import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Model } from "mongoose";
import { User } from "./users/user.schema";
import { Product } from "./products/product.schema";
import { Category } from "./categories/category.schema";
import { Order } from "./orders/order.schema";
import { getModelToken } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const productModel = app.get<Model<Product>>(getModelToken(Product.name));
  const categoryModel = app.get<Model<Category>>(getModelToken(Category.name));
  const orderModel = app.get<Model<Order>>(getModelToken(Order.name));

  console.log("🗑️ Clearing existing data...");

  // Clear existing data
  await userModel.deleteMany({});
  await productModel.deleteMany({});
  await categoryModel.deleteMany({});
  await orderModel.deleteMany({});

  console.log("👤 Creating users...");

  // Create users
  const hashedPassword = await bcrypt.hash("123456", 10);

  const users = await userModel.insertMany([
    {
      email: "admin@vuaxemohinh.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
      phone: "0901234567",
      address: "Hà Nội, Việt Nam",
    },
    {
      email: "user1@vuaxemohinh.com",
      password: hashedPassword,
      name: "Nguyễn Văn A",
      role: "user",
      phone: "0907654321",
      address: "TP.HCM, Việt Nam",
    },
    {
      email: "user2@vuaxemohinh.com",
      password: hashedPassword,
      name: "Trần Thị B",
      role: "user",
      phone: "0903456789",
      address: "Đà Nẵng, Việt Nam",
    },
  ]);

  console.log("📂 Creating categories...");

  // Create categories for model toys
  const categories = await categoryModel.insertMany([
    {
      name: "Xe Ô Tô Mô Hình",
      description: "Các loại xe ô tô mô hình tỷ lệ từ 1:64 đến 1:12",
      slug: "xe-oto-mo-hinh",
    },
    {
      name: "Xe Mô Tô Mô Hình",
      description: "Mô hình xe máy, moto phân khối lớn các loại",
      slug: "xe-moto-mo-hinh",
    },
    {
      name: "Xe Tải & Xe Chuyên Dụng",
      description: "Mô hình xe tải, xe cần cẩu, xe cứu hỏa",
      slug: "xe-tai-chuyen-dung",
    },
    {
      name: "Máy Bay Mô Hình",
      description: "Mô hình máy bay dân dụng và quân sự",
      slug: "may-bay-mo-hinh",
    },
    {
      name: "Tàu Thuyền Mô Hình",
      description: "Mô hình tàu chiến, du thuyền, tàu container",
      slug: "tau-thuyen-mo-hinh",
    },
    {
      name: "Robot & Gundam",
      description: "Mô hình robot Gundam, Transformer",
      slug: "robot-gundam",
    },
    {
      name: "Dụng Cụ Mô Hình",
      description: "Dụng cụ lắp ráp, sơn, keo dán mô hình",
      slug: "dung-cu-mo-hinh",
    },
  ]);

  console.log("🎯 Creating products...");

  // Create products with categoryId field names
  const products = await productModel.insertMany([
    // Xe Ô Tô Mô Hình
    {
      name: "Lamborghini Aventador 1:18 Maisto",
      description:
        "Mô hình xe Lamborghini Aventador tỷ lệ 1:18, chất liệu hợp kim cao cấp, có thể mở cửa và nắp capô. Màu vàng đặc trưng của thương hiệu.",
      price: 850000,
      salePrice: 750000,
      stock: 25,
      categoryId: categories[0]._id,
      images: ["/images/lamborghini-aventador.jpg"],
      isFeatured: true,
      tags: ["lamborghini", "supercar", "1:18", "maisto"],
    },
    {
      name: "Ferrari 488 GTB 1:24 Bburago",
      description:
        "Mô hình Ferrari 488 GTB tỷ lệ 1:24, chi tiết tinh xảo từ nội thất đến động cơ. Màu đỏ Ferrari truyền thống.",
      price: 450000,
      salePrice: 380000,
      stock: 40,
      categoryId: categories[0]._id,
      images: ["/images/ferrari-488-gtb.jpg"],
      isFeatured: true,
      tags: ["ferrari", "488gtb", "1:24", "bburago"],
    },
    {
      name: "Porsche 911 GT3 RS 1:32 RMZ City",
      description:
        "Mô hình Porsche 911 GT3 RS tỷ lệ 1:32, kích thước nhỏ gọn phù hợp để bàn. Có âm thanh và đèn LED.",
      price: 280000,
      salePrice: 250000,
      stock: 60,
      categoryId: categories[0]._id,
      images: ["/images/porsche-911-gt3-rs.jpg"],
      isFeatured: false,
      tags: ["porsche", "911gt3rs", "1:32", "rmzcity"],
    },
    // Xe Mô Tô Mô Hình
    {
      name: "Ducati Panigale V4 1:12 Maisto",
      description:
        "Mô hình xe mô tô Ducati Panigale V4 tỷ lệ 1:12, chi tiết động cơ V4 tinh xảo. Có thể điều chỉnh góc lái.",
      price: 680000,
      salePrice: 580000,
      stock: 30,
      categoryId: categories[1]._id,
      images: ["/images/ducati-panigale-v4.jpg"],
      isFeatured: true,
      tags: ["ducati", "panigale", "v4", "1:12", "maisto"],
    },
    {
      name: "Yamaha YZF-R1 1:18 Welly",
      description:
        "Mô hình Yamaha YZF-R1 tỷ lệ 1:18, thiết kế thể thao với livery MotoGP. Chất liệu cao cấp.",
      price: 350000,
      salePrice: 320000,
      stock: 45,
      categoryId: categories[1]._id,
      images: ["/images/yamaha-yzf-r1.jpg"],
      isFeatured: false,
      tags: ["yamaha", "yzf-r1", "1:18", "welly", "motogp"],
    },
    // Xe Tải & Xe Chuyên Dụng
    {
      name: "Mercedes-Benz Actros Truck 1:32 Welly",
      description:
        "Mô hình xe tải Mercedes-Benz Actros tỷ lệ 1:32, có thể tách rời cabin và thùng xe. Bánh xe cao su.",
      price: 520000,
      salePrice: 480000,
      stock: 20,
      categoryId: categories[2]._id,
      images: ["/images/mercedes-actros-truck.jpg"],
      isFeatured: false,
      tags: ["mercedes", "actros", "truck", "1:32", "welly"],
    },
    {
      name: "Scania Fire Truck 1:50 Siku",
      description:
        "Mô hình xe cứu hỏa Scania tỷ lệ 1:50, có thang cứu hỏa có thể nâng hạ và xoay 360 độ.",
      price: 780000,
      salePrice: 720000,
      stock: 12,
      categoryId: categories[2]._id,
      images: ["/images/scania-fire-truck.jpg"],
      isFeatured: true,
      tags: ["scania", "firetruck", "1:50", "siku"],
    },
    // Máy Bay Mô Hình
    {
      name: "Boeing 777 Vietnam Airlines 1:200 JC Wings",
      description:
        "Mô hình máy bay Boeing 777 Vietnam Airlines tỷ lệ 1:200, livery chính thức với logo sen vàng.",
      price: 1250000,
      salePrice: 1150000,
      stock: 8,
      categoryId: categories[3]._id,
      images: ["/images/boeing-777-vn.jpg"],
      isFeatured: true,
      tags: ["boeing", "777", "vietnam-airlines", "1:200", "jcwings"],
    },
    {
      name: "F-16 Fighting Falcon USAF 1:72 Hobby Master",
      description:
        "Mô hình máy bay chiến đấu F-16 của không quân Mỹ, tỷ lệ 1:72. Chi tiết vũ khí và radar.",
      price: 890000,
      salePrice: 820000,
      stock: 15,
      categoryId: categories[3]._id,
      images: ["/images/f16-fighting-falcon.jpg"],
      isFeatured: false,
      tags: ["f16", "usaf", "fighter", "1:72", "hobbymaster"],
    },
    // Tàu Thuyền Mô Hình
    {
      name: "USS Missouri Battleship 1:700 Tamiya",
      description:
        "Mô hình tàu chiến USS Missouri tỷ lệ 1:700, kit lắp ráp với hướng dẫn chi tiết. Chất lượng Nhật Bản.",
      price: 1850000,
      salePrice: 1650000,
      stock: 5,
      categoryId: categories[4]._id,
      images: ["/images/uss-missouri.jpg"],
      isFeatured: true,
      tags: ["uss-missouri", "battleship", "1:700", "tamiya", "kit"],
    },
    // Robot & Gundam
    {
      name: "RG Gundam Strike Freedom 1:144 Bandai",
      description:
        "Mô hình Gundam Strike Freedom Real Grade 1:144, khung nội tại chi tiết, nhiều khớp cử động.",
      price: 750000,
      salePrice: 680000,
      stock: 35,
      categoryId: categories[5]._id,
      images: ["/images/gundam-strike-freedom.jpg"],
      isFeatured: true,
      tags: ["gundam", "strike-freedom", "rg", "1:144", "bandai"],
    },
    {
      name: "Optimus Prime Masterpiece MP-44 Takara Tomy",
      description:
        "Mô hình Optimus Prime Masterpiece MP-44, biến hình hoàn hảo từ robot sang xe tải. Phụ kiện đầy đủ.",
      price: 3200000,
      salePrice: 2900000,
      stock: 3,
      categoryId: categories[5]._id,
      images: ["/images/optimus-prime-mp44.jpg"],
      isFeatured: true,
      tags: ["optimus-prime", "transformers", "mp-44", "takara-tomy"],
    },
    // Dụng Cụ Mô Hình
    {
      name: "Bộ Sơn Acrylic Tamiya 12 Màu Cơ Bản",
      description:
        "Bộ 12 màu sơn acrylic Tamiya dành cho mô hình, màu chuẩn, khô nhanh, dễ pha trộn.",
      price: 480000,
      salePrice: 420000,
      stock: 50,
      categoryId: categories[6]._id,
      images: ["/images/tamiya-acrylic-paint-set.jpg"],
      isFeatured: false,
      tags: ["tamiya", "acrylic", "paint", "modeling"],
    },
    {
      name: "Bộ Dụng Cụ Cắt Gundam Bandai",
      description:
        "Bộ dụng cụ cắt chuyên dụng cho Gundam gồm: kìm cắt, dao cắt, giũa, thước kẻ. Chất lượng Nhật Bản.",
      price: 650000,
      salePrice: 580000,
      stock: 25,
      categoryId: categories[6]._id,
      images: ["/images/gundam-tool-set.jpg"],
      isFeatured: false,
      tags: ["bandai", "gundam", "tools", "cutting"],
    },
  ]);

  console.log("📦 Creating sample orders...");

  // Create sample orders
  const orders = await orderModel.insertMany([
    {
      userId: users[1]._id,
      items: [
        {
          productId: products[0]._id,
          quantity: 1,
          price: 750000,
          productName: products[0].name,
        },
        {
          productId: products[10]._id,
          quantity: 2,
          price: 680000,
          productName: products[10].name,
        },
      ],
      totalAmount: 2110000,
      status: "confirmed",
      shippingAddress: {
        fullName: "Nguyễn Văn A",
        phone: "0907654321",
        address: "123 Nguyễn Huệ",
        city: "TP.HCM",
        district: "Quận 1",
        ward: "Phường Bến Nghé",
      },
      paymentMethod: "credit_card",
    },
    {
      userId: users[2]._id,
      items: [
        {
          productId: products[7]._id,
          quantity: 1,
          price: 1150000,
          productName: products[7].name,
        },
      ],
      totalAmount: 1150000,
      status: "shipped",
      shippingAddress: {
        fullName: "Trần Thị B",
        phone: "0903456789",
        address: "456 Trần Phú",
        city: "Đà Nẵng",
        district: "Quận Hải Châu",
        ward: "Phường Thạch Thang",
      },
      paymentMethod: "bank_transfer",
    },
  ]);

  console.log("✅ Seeding completed successfully!");
  console.log(`👤 Created ${users.length} users`);
  console.log(`📂 Created ${categories.length} categories`);
  console.log(`🎯 Created ${products.length} products`);
  console.log(`📦 Created ${orders.length} orders`);

  console.log("\n🎮 Model Toys Categories:");
  categories.forEach((cat) => console.log(`  - ${cat.name}`));

  console.log("\nFeatured Products:");
  products
    .filter((p) => p.isFeatured)
    .forEach((product) => {
      console.log(
        `  - ${product.name} - ${product.salePrice?.toLocaleString() || product.price.toLocaleString()}₫`
      );
    });

  await app.close();
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
