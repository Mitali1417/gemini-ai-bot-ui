# Gemini AI Chat App

A modern, Gemini-style conversational AI chat application built with React, Zustand, shadcn/ui, and Tailwind CSS. Features OTP-based authentication, chatroom management, AI messaging, image uploads, and persistent local storage.

---

## ✨ Features

- **OTP-based Login/Signup** with country code selection (from restcountries.com)
- **Persistent Auth & Chat Data** (localStorage)
- **Chatroom Management**: Create, delete, and switch chatrooms
- **Conversational UI**: Modern, responsive, Gemini-inspired chat interface
- **AI Messaging**: Simulated AI replies with typing indicator and throttling
- **Image Uploads**: Attach, preview, and remove images in chat
- **Copy-to-Clipboard**: Copy any message with a click (with toast feedback)
- **Infinite Scroll**: Load older messages on demand
- **Debounced Search**: Quickly find chatrooms
- **Skeleton Loaders**: Smooth loading experience
- **Keyboard Accessibility**: Full keyboard navigation and accessibility
- **Mobile Responsive & Dark Mode**
- **Toast Notifications** for actions and errors

---

## 🛠️ Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Zustand** (state management & persistence)
- **shadcn/ui** (UI components)
- **Tailwind CSS** (styling)
- **TanStack Query** (API hooks)
- **React Hook Form + Zod** (form validation)
- **sonner** (toasts)

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/gemini-bot.git
cd gemini-bot
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the development server
```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

## 📝 Usage

- **Sign up or sign in** with your phone number and country code (OTP is always `123456` for demo)
- **Create and manage chatrooms** from the sidebar
- **Send messages and images** in any chatroom
- **Copy messages** by hovering and clicking the copy button
- **Delete chatrooms** with the trash icon
- **Switch between light/dark mode** with the toggle
- **All data is saved locally**—refreshing the page keeps you signed in and your chats intact

---

## 📁 Project Structure

- `src/components/` — UI and chat components
- `src/pages/` — Page-level components (SignIn, SignUp, OTP, ChatHome)
- `src/components/store/` — Zustand stores for auth and chat
- `src/components/hooks/` — Custom hooks (API, OTP, etc.)
- `src/components/ui/` — shadcn/ui components

---

## 🙏 Credits

- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [sonner](https://sonner.emilkowal.ski/)

---

## 📜 License

MIT
