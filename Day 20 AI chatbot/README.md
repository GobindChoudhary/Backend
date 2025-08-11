

# 🧠 Real-time AI Chatbot with Section Memory

A modern **React + Node.js** real-time chatbot that remembers conversation sections, built with **Socket.IO** for seamless communication and **React-Markdown** for clean AI response formatting.

<img width="1920" height="1080" alt="Screenshot 2025-08-10 171005" src="https://github.com/user-attachments/assets/cba32a06-7d72-4a9d-9697-ad02bbc8cc53" /> <!-- Optional image if you want to add -->

---

## 🚀 Features

* **Real-time Messaging** — Instant user-AI interaction with WebSocket communication.
* **Section Memory** — AI remembers key points from earlier in the conversation to give context-aware replies.
* **AI Integration** — Powered by [@google/genai](https://www.npmjs.com/package/@google/genai) for smart, human-like responses.
* **Markdown Support** — AI responses are beautifully rendered with `react-markdown`.
* **Dark & Modern UI** — Clean and minimalist chat design with custom colors.
* **Scroll-hidden Chat Window** — Immersive experience with a hidden scroll bar.

---

## 🛠️ Tech Stack

### **Frontend** (React)

* **react-markdown** — Renders AI responses with Markdown formatting.
* **socket.io-client** — Establishes WebSocket connection with the backend for real-time messages.

### **Backend** (Node.js / Express)

* **express** — Web framework for serving APIs.
* **socket.io** — Real-time bidirectional communication between client and server.
* **@google/genai** — Google Generative AI SDK for intelligent responses.
* **dotenv** — Environment variable management.
* **cors** — Handles cross-origin requests.

---

## 📂 Project Structure

```
ai-chatbot/
├── backend
│   ├── src
│   │   ├── services
│   │   │   └── app.js          # AI logic & memory handling
│   │   └── server.js           # Express + Socket.IO server
│   ├── .env                    # API keys & configs
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── public                  # Static files
│   ├── src
│   │   ├── assets               # Images, icons, etc.
│   │   ├── App.css              # Chat UI styles
│   │   ├── App.jsx              # Main React app
│   │   ├── index.css            # Global styles
│   │   ├── main.jsx             # React entry point
│   ├── package.json
│   ├── vite.config.js           # Vite config
│   └── index.html               # HTML template
│
├── README.md
└── .gitignore

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/GobindChoudhary/Backend/Day 20 AI chatbot.git
cd ai-chatbot
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
GOOGLE_API_KEY=your_google_genai_api_key
```

Run the backend:
```bash
node server.js
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧠 How Section Memory Works

Instead of treating every user message in isolation, the chatbot **stores the recent conversation context in memory** and sends it with each new prompt. This allows the AI to remember:

* Previous questions in the same topic
* Follow-up references
* Conversation continuity

---

## 📜 Example Conversation

**User:** "Tell me about JavaScript" </br>
**AI:** "JavaScript is a programming language used mainly for web development..." </br>
**User:** "And what about ES6?"</br>
**AI:** "Since you asked about JavaScript earlier, ES6 is an updated version introducing features like arrow functions..."</br>

---

## 📌 Future Improvements

* Add authentication for personalized AI memory per user
* Save chat history to database
* Multi-language support

---
👤 Author </br>
Gobind Choudhary </br>
[LinkedIn](https://www.linkedin.com/in/gobind-chaudhary/) • [X](https://x.com/Gobind_003)

