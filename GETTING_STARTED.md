# 🚀 Hướng dẫn Khởi chạy Dự án E-commerce

## ✅ Tình trạng hiện tại

Dự án đã được thiết lập thành công và sẵn sàng cho phát triển!

- ✅ Backend (NestJS): http://localhost:5000
- ✅ Frontend (Next.js): http://localhost:3000
- ✅ Database: SQLite (ecommerce.db)

## 🏃‍♂️ Cách chạy dự án

### 1. Chạy Backend (Terminal 1)

```bash
cd backend
npm run start:dev
```

### 2. Chạy Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

## 📡 API Endpoints có sẵn

### Authentication

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `GET /api/auth/profile` - Lấy thông tin profile

### Users

- `GET /api/users` - Danh sách người dùng
- `GET /api/users/:id` - Chi tiết người dùng
- `POST /api/users` - Tạo người dùng mới
- `PATCH /api/users/:id` - Cập nhật người dùng
- `DELETE /api/users/:id` - Xóa người dùng

### Products

- `GET /api/products` - Danh sách sản phẩm
- `GET /api/products/:id` - Chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PATCH /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Categories

- `GET /api/categories` - Danh sách danh mục
- `GET /api/categories/:id` - Chi tiết danh mục
- `POST /api/categories` - Tạo danh mục mới
- `PATCH /api/categories/:id` - Cập nhật danh mục
- `DELETE /api/categories/:id` - Xóa danh mục

## 🛠️ Phát triển tiếp theo

### Modules đã tạo nhưng chưa hoàn thiện:

- [ ] Cart Module - Giỏ hàng
- [ ] Orders Module - Đơn hàng
- [ ] Payments Module - Thanh toán
- [ ] Chatbot Module - Hỗ trợ chatbot

### Frontend cần phát triển:

- [ ] Pages và Components
- [ ] Redux Store integration
- [ ] UI/UX với Tailwind CSS
- [ ] Authentication flows
- [ ] Product catalog
- [ ] Shopping cart
- [ ] Checkout process

## 📝 Test API

Bạn có thể test API bằng cách sử dụng:

- **Postman**: Import endpoints từ danh sách trên
- **Thunder Client** (VS Code Extension)
- **curl** commands

### Ví dụ test endpoint:

```bash
# Get all categories
curl http://localhost:5000/api/categories

# Get all products
curl http://localhost:5000/api/products

# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## 🎯 Mục tiêu tiếp theo

1. **Hoàn thiện Backend APIs**
2. **Xây dựng Frontend UI**
3. **Tích hợp Authentication**
4. **Phát triển Shopping Cart**
5. **Tích hợp Payment Gateway**
6. **Xây dựng Admin Dashboard**
7. **Thêm Chatbot AI**

Dự án đã sẵn sàng cho development! 🚀
