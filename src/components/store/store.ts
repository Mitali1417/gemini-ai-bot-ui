/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type User = {
  id: string;
  phone: string;
  country: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  otpSent: boolean;
  sendOTP: (phone: string, country: string) => void;
  verifyOTP: (otp: string) => boolean;
  logout: () => void;
  _pendingPhone: string;
  _pendingCountry: string;
};

const AUTH_KEY = 'gemini_auth';
const CHAT_KEY = 'gemini_chatrooms';

function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveAuth(state: any) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  }));
}

export { saveAuth };

function loadChatrooms() {
  try {
    const raw = localStorage.getItem(CHAT_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveChatrooms(state: any) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(state.chatrooms));
}

export const useAuthStore = create<AuthState>((set, get) => {
  const initial = loadAuth();
  return {
    user: initial?.user || null,
    isLoggedIn: initial?.isLoggedIn || false,
    otpSent: false,
    sendOTP: (phone, country) => {
      set((state) => ({ ...state, otpSent: true, _pendingPhone: phone, _pendingCountry: country }));
    },
    verifyOTP: (otp) => {
      if (otp === '123456') {
        const { otpSent, _pendingPhone, _pendingCountry } = get();
        if (otpSent && _pendingPhone && _pendingCountry) {
          set((state) => {
            const newState = {
              ...state,
              user: {
                id: Date.now().toString(),
                phone: _pendingPhone,
                country: _pendingCountry,
              },
              isLoggedIn: true,
              otpSent: false,
              _pendingPhone: '',
              _pendingCountry: '',
            };
            saveAuth(newState);
            return newState;
          });
          return true;
        }
      }
      return false;
    },
    logout: () => {
      set((state) => {
        const newState = { ...state, user: null, isLoggedIn: false, otpSent: false, _pendingPhone: '', _pendingCountry: '' };
        saveAuth(newState);
        return newState;
      });
    },
    _pendingPhone: '',
    _pendingCountry: '',
  };
});

type Message = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: number;
  image?: string;
};

type Chatroom = {
  id: string;
  title: string;
  messages: Message[];
};

type ChatState = {
  chatrooms: Chatroom[];
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  addMessage: (chatroomId: string, message: Message) => void;
  setChatrooms: (chatrooms: Chatroom[]) => void;
};

export const useChatStore = create<ChatState>((set) => {
  return {
    chatrooms: loadChatrooms(),
    createChatroom: (title) => {
      const newRoom: Chatroom = {
        id: Date.now().toString(),
        title,
        messages: [],
      };
      set((state) => {
        const newState = { ...state, chatrooms: [newRoom, ...state.chatrooms] };
        saveChatrooms(newState);
        return newState;
      });
    },
    deleteChatroom: (id) => {
      set((state) => {
        const newState = { ...state, chatrooms: state.chatrooms.filter((c) => c.id !== id) };
        saveChatrooms(newState);
        return newState;
      });
    },
    addMessage: (chatroomId, message) => {
      set((state) => {
        const newState = {
          ...state,
          chatrooms: state.chatrooms.map((room) =>
            room.id === chatroomId
              ? { ...room, messages: [...room.messages, message] }
              : room
          ),
        };
        saveChatrooms(newState);
        return newState;
      });
    },
    setChatrooms: (chatrooms) => {
      set((state) => {
        const newState = { ...state, chatrooms };
        saveChatrooms(newState);
        return newState;
      });
    },
  };
}); 