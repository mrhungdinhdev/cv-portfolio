Được, nhưng **không gọi DeepSeek API trực tiếp trong HTML/JS** vì sẽ lộ API key.

Với web tĩnh HTML/CSS/JS của bạn, cách đúng là:

```txt
HTML portfolio
→ gọi serverless function
→ serverless gọi DeepSeek API
→ trả lời về web
```

Bạn có thể dùng **Vercel Function miễn phí**.

## Cấu trúc project

```txt
portfolio/
├─ index.html
├─ src/
│  └─ main.js
├─ api/
│  └─ chat.js
├─ data/
│  └─ cv.json
└─ package.json
```

## 1. Tạo `data/cv.json`

```json
{
  "name": "Đinh Văn Hùng",
  "role": "Full Stack Developer",
  "summary": "Full Stack Developer with 3 years of hands-on experience, specialising in backend development and system design.",
  "skills": ["React", "Next.js", "Node.js", "NestJS", "Laravel", "MongoDB", "MySQL", "AWS", "Docker"],
  "projects": ["AI Social Builder", "Crawler Social Tool", "AnchayFood", "CheckYay", "Video NFT", "CyberMart"],
  "contact": {
    "email": "manhhung.dvh@gmail.com",
    "github": "https://github.com/mrhungdinhdev"
  }
}
```

## 2. Tạo `api/chat.js`

```js
import cv from "../data/cv.json" assert { type: "json" };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `
You are an AI assistant on Đinh Văn Hùng's portfolio website.

Only answer based on this CV data:
${JSON.stringify(cv)}

Rules:
- Do not invent fake information.
- If information is missing, say: "Thông tin này chưa có trong portfolio."
- Answer in Vietnamese if the user asks in Vietnamese.
- Answer in English if the user asks in English.
`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.4
      })
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Không có phản hồi."
    });
  } catch (error) {
    return res.status(500).json({ error: "AI error" });
  }
}
```

## 3. Thêm chat UI vào `index.html`

```html
<div id="chat-box" class="fixed bottom-6 right-6 w-80 bg-neutral-900 text-white rounded-2xl p-4 shadow-xl z-50">
  <div class="font-bold mb-2">Hung AI Assistant</div>

  <div id="chat-reply" class="text-sm bg-neutral-800 rounded-lg p-3 mb-3">
    Xin chào 👋 Tôi có thể giới thiệu về Hùng, kỹ năng và dự án của anh ấy.
  </div>

  <textarea
    id="chat-input"
    class="w-full p-2 rounded-lg bg-neutral-800 text-sm outline-none"
    placeholder="Hỏi về kỹ năng, dự án..."
  ></textarea>

  <button
    id="chat-send"
    class="mt-2 w-full bg-orange-500 rounded-lg py-2 font-semibold"
  >
    Gửi
  </button>
</div>
```

## 4. Thêm JS gọi API

Trong `src/main.js` hoặc cuối `index.html`:

```js
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send");
const replyBox = document.getElementById("chat-reply");

sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  replyBox.textContent = "Đang trả lời...";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  replyBox.textContent = data.reply || "Không có phản hồi.";
});
```

## 5. Deploy lên Vercel

Cài:

```bash
npm init -y
```

Tạo `package.json` kiểu này:

```json
{
  "type": "module"
}
```

Deploy lên Vercel, rồi vào:

```txt
Project Settings → Environment Variables
```

Thêm:

```txt
DEEPSEEK_API_KEY=sk-xxxx
```

## Kết luận

Web của bạn dùng **HTML + CSS + JS + Tailwind + Three.js vẫn thêm được bình thường**.

Chỉ cần nhớ:

```txt
Frontend không giữ API key
API key để trong Vercel Environment Variables
HTML gọi /api/chat
/api/chat gọi DeepSeek
```
