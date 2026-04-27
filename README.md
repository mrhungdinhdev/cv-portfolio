# Dinh Van Hung Portfolio

Portfolio được tổ chức theo cấu trúc ExpressJS, tách rõ backend và frontend.

## Cấu trúc

```text
backend/
  data/                 # Dữ liệu server sử dụng, ví dụ CV JSON
  src/
    config/             # Cấu hình môi trường và đường dẫn
    routes/             # Express routers cho /api/*
    services/           # Logic gọi OpenRouter, OpenAI TTS, đọc CV
    app.js              # Khởi tạo Express app
    server.js           # Entry point chạy HTTP server

frontend/
  public/               # HTML, CSS, JS, ảnh tĩnh được Express phục vụ

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
- `npm start`: chạy server ở chế độ production.
- `npm run check`: kiểm tra cú pháp các file backend chính.

## API

- `POST /api/chat`: tạo phản hồi AI dựa trên dữ liệu `backend/data/cv.json`.
- `POST /api/tts`: tạo audio TTS dạng MP3.

Các biến môi trường cần thiết nằm trong `.env.example`.
