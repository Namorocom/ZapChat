import { Injectable, signal, computed, inject } from "@angular/core";
import { SupabaseService } from "./supabase.service";

export interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  sender: "me" | "other";
  timestamp: Date;
  isGenerating?: boolean;
  groundingUrls?: { uri: string; title: string }[];
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  type: "normal" | "search" | "maps" | "video";
  messages: Message[];
  isOnline?: boolean;
  lastSeen?: Date;
}

@Injectable({ providedIn: "root" })
export class ChatService {
  supabase = inject(SupabaseService);
  
  chats = signal<Chat[]>([]);

  constructor() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      // Simulating device contacts as requested
      this.loadMockChats();
    } catch (e) {
      console.error('Failed to load contacts', e);
      this.loadMockChats();
    }
  }

  loadMockChats() {
    this.chats.set([
      {
        id: "contact1",
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        unreadCount: 2,
        type: "normal",
        isOnline: true,
        messages: [
          {
            id: "m1",
            text: "Hey man! Are you still coming over for the game tonight? 🏀",
            sender: "other",
            timestamp: new Date(Date.now() - 3600000),
          },
          {
            id: "m2",
            text: "Absolutely! Just finishing up some work. Should be there in about 20 mins.",
            sender: "me",
            timestamp: new Date(Date.now() - 3500000),
          },
        ],
      },
      {
        id: "contact2",
        name: "Beatriz Silva",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz",
        unreadCount: 0,
        type: "normal",
        isOnline: false,
        lastSeen: new Date(Date.now() - 7200000),
        messages: [],
      },
      {
        id: "zap-search",
        name: "Zap Search",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Search",
        unreadCount: 0,
        type: "search",
        isOnline: true,
        messages: [
          {
            id: "m1",
            text: "Hi! I can search the web for you. What do you want to know?",
            sender: "other",
            timestamp: new Date(),
          },
        ],
      },
    ]);
  }

  getChat(id: string) {
    return computed(() => this.chats().find((c) => c.id === id));
  }

  addMessage(chatId: string, message: Message) {
    this.chats.update((chats) =>
      chats.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: [...c.messages, message],
            lastMessage:
              message.text ||
              (message.imageUrl ? "Image" : message.videoUrl ? "Video" : ""),
            lastMessageTime: message.timestamp,
          };
        }
        return c;
      }),
    );
  }

  updateMessage(chatId: string, messageId: string, updates: Partial<Message>) {
    this.chats.update((chats) =>
      chats.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: c.messages.map((m) =>
              m.id === messageId ? { ...m, ...updates } : m,
            ),
          };
        }
        return c;
      }),
    );
  }
}
