# Dinh Van Hung Portfolio

Portfolio fullstack dùng ExpressJS để phục vụ cả API và giao diện tĩnh trong cùng một project.

## Cấu trúc

```text
src/
  config/               # Cấu hình môi trường và đường dẫn
  routes/               # Express routers cho /api/*
  services/             # Logic gọi OpenRouter, OpenAI TTS, đọc CV
  app.js                # Khởi tạo Express app
  dev.js                # Entry point chạy local HTTP server
  server.js             # Entry point cho Vercel serverless

public/                 # HTML, CSS, JS, ảnh tĩnh được Express phục vụ
data/                   # Dữ liệu server sử dụng, ví dụ CV JSON
docs/                   # Tài liệu/phác thảo dự án
```

## Chạy local

```bash
npm install
npm run dev
```

Mặc định server chạy ở `http://localhost:3001`. Có thể đổi port bằng biến môi trường `PORT`.

## Scripts

- `npm run dev`: chạy Express server local.
- `npm start`: chạy Express server.
- `npm run check`: kiểm tra cú pháp các file trong `src/`.

## API

- `POST /api/chat`: tạo phản hồi AI dựa trên dữ liệu `data/cv.json`.
- `POST /api/tts`: tạo audio TTS dạng MP3.

Các biến môi trường cần thiết đặt trong `.env`.
