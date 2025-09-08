# Hướng Dẫn Deploy Frontend và Backend lên Vercel

## Bước 1: Chuẩn bị Environment Variables

### Backend Environment Variables

Bạn cần thiết lập các biến môi trường sau trong Vercel dashboard cho backend:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vuaxemohinh?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables

Thiết lập các biến môi trường sau cho frontend:

```
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key-minimum-32-characters
NEXTAUTH_URL=https://your-frontend-domain.vercel.app
```

## Bước 2: Deploy Backend

1. Mở terminal và chạy:

```bash
cd backend
npm install -g vercel
vercel login
vercel --prod
```

2. Sau khi deploy xong, vào Vercel dashboard:
   - Chọn project backend
   - Vào Settings > Environment Variables
   - Thêm các biến môi trường backend ở trên

## Bước 3: Deploy Frontend

1. Cập nhật file `.env.local` trong frontend với URL backend đã deploy:

```
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app
```

2. Deploy frontend:

```bash
cd frontend
vercel --prod
```

3. Sau khi deploy xong, vào Vercel dashboard:
   - Chọn project frontend
   - Vào Settings > Environment Variables
   - Thêm các biến môi trường frontend

## Bước 4: Cập nhật CORS

Sau khi có URL frontend, cập nhật biến `CORS_ORIGIN` trong backend với URL frontend thực tế.

## Bước 5: Test

1. Truy cập URL frontend
2. Kiểm tra các chức năng:
   - Đăng ký/đăng nhập
   - Xem sản phẩm
   - Thêm vào giỏ hàng
   - API calls hoạt động

## Scripts Tự Động

Bạn có thể sử dụng các script PowerShell:

- `./deploy-backend.ps1` - Deploy backend
- `./deploy-frontend.ps1` - Deploy frontend

## Lưu Ý

- MongoDB Atlas cần whitelist IP 0.0.0.0/0 cho Vercel
- JWT_SECRET và NEXTAUTH_SECRET nên dài ít nhất 32 ký tự
- CORS_ORIGIN phải match chính xác với URL frontend
- Kiểm tra logs trong Vercel dashboard nếu có lỗi
