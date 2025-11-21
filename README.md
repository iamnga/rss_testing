# VIB RSS Feed Manager

Ứng dụng quản lý RSS feed để testing Power Automate flow phân tích sentiment tin tức cho VIB.

## Tính năng

- ✅ Tạo và quản lý RSS feed chuẩn RSS 2.0
- ✅ Thêm/xóa tin tức dễ dàng qua giao diện web
- ✅ RSS feed tự động cập nhật theo thời gian thực
- ✅ Hỗ trợ phân loại sentiment (positive/negative/neutral)
- ✅ Giao diện đơn giản, dễ sử dụng với màu sắc VIB

## Màu sắc

- Primary color: #2b6cae
- Secondary color: #f19b38
- Background: #fefefe
- Accent/light section: #92b5d7

## Cài đặt và Chạy Local

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

Mở trình duyệt tại `http://localhost:3000`

## RSS Feed URL

Sau khi deploy lên Vercel, bạn có thể sử dụng RSS feed URL:

```
https://your-app.vercel.app/api/rss
```

Copy URL này và paste vào Power Automate flow để bắt đầu testing.

## Deploy lên Vercel

### Cách 1: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Cách 2: Deploy qua Vercel Dashboard

1. Push code lên GitHub repository
2. Truy cập [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Vercel sẽ tự động detect Next.js và deploy

## Cấu trúc Project

```
├── app/
│   ├── api/
│   │   ├── news/route.ts     # API CRUD cho tin tức
│   │   └── rss/route.ts      # RSS feed endpoint
│   ├── globals.css           # Tailwind CSS
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Trang chính (UI quản lý)
├── lib/
│   └── storage.ts            # File-based storage
├── types/
│   └── news.ts               # TypeScript types
└── data/
    └── news.json             # Dữ liệu tin tức (auto-generated)
```

## Sử dụng

1. Truy cập website sau khi deploy
2. Điền thông tin tin tức vào form bên trái
3. Click "Thêm Tin Mới"
4. Copy RSS feed URL ở phía trên
5. Paste URL vào Power Automate flow
6. Test flow của bạn!

## Lưu ý

- Dữ liệu được lưu trong file `data/news.json`
- Trên Vercel, dữ liệu sẽ bị reset khi redeploy (đây là môi trường testing)
- Nếu cần persistence lâu dài, có thể migrate sang database (Vercel Postgres, MongoDB, etc.)

## Hỗ trợ

Nếu có vấn đề gì, hãy kiểm tra:
- Console log trong browser (F12)
- Vercel deployment logs
- RSS feed có đúng format không tại `/api/rss`
