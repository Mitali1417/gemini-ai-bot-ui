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

<img width="1918" height="895" alt="image" src="https://github.com/user-attachments/assets/6674aa83-d42c-4ce0-bf2a-114f3b118e73" />
<img width="1920" height="883" alt="image" src="https://github.com/user-attachments/assets/66c2ff46-78bc-4051-8ecd-21c8e633224a" />
<img width="1916" height="875" alt="image" src="https://github.com/user-attachments/assets/5e378ac8-a1a9-4376-b529-02e3450c7f7a" />
<img width="1918" height="891" alt="image" src="https://github.com/user-attachments/assets/82066fba-e732-4f8d-a97f-93bb3d598084" />
<img width="1918" height="905" alt="image" src="https://github.com/user-attachments/assets/f6d36452-ec92-4ad0-9e59-ff1d9a424a4a" />
<img width="1220" height="907" alt="image" src="https://github.com/user-attachments/assets/34fa5716-8832-44a5-a4da-887a7733a967" />
<img width="1216" height="902" alt="image" src="https://github.com/user-attachments/assets/983634ed-cf94-4d40-95dd-9a0e19cfdf29" />

