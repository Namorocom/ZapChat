import { Injectable, signal, computed } from "@angular/core";

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
  chats = signal<Chat[]>([
    {
      id: "1",
      name: "Alex Johnson",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBg_66d1g_b4cSYHUSzgtZLRp54EdmYwayqMaTwzYQclDhW3i1T68wpDQPyZb8HHZ5_Nnjq9JqYPqYMuGx3EDYQJNZ6lCnFQFap0smPDIyk6kDdH6IFQDVlhIbMSh277egoTBbSRQB-X0pOsxyNVNtBTZ2YTPtKGb9IwBzzqUBnK3ebxamzoPbNfpVky_xDfP2GjAkm60L48de0TrNSTyF5j4Pp5d9mKpK5hn9prh9dxCEeXrNFSb11oKL-BkPoenBfFaNgBAXZpBc",
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
        {
          id: "m3",
          text: "Sweet! I've already ordered the pizza. 🍕",
          sender: "other",
          timestamp: new Date(Date.now() - 3400000),
        },
        {
          id: "m4",
          text: "Perfect. Did you get the one with extra pepperoni?",
          sender: "me",
          timestamp: new Date(Date.now() - 3300000),
        },
        {
          id: "m5",
          text: "You know it! And some wings too. See ya soon!",
          sender: "other",
          timestamp: new Date(Date.now() - 3200000),
        },
        {
          id: "m6",
          text: "See ya!",
          sender: "me",
          timestamp: new Date(Date.now() - 3100000),
        },
        {
          id: "m7",
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBIatmYphKr5zQfvvIjQ04tK6BWruMxZDVQlMLXrK1EOygPE-qiLhrww153qGADDN1925XNJeDYaV23UgF_P7Xyxe1ePTcB8gkvEFQzekM2lblAeLIgwlLfaUkMXHZmJsWM_bSVun466gT0KcFkmQURO5A4qBPU5rzuRPv19ku_VV7fX84XhnN0nEmn4IQsxRFv9CMW5krk7DhBZs4EmYzycC5ve3EHNn6dO7-hXoKfoHRXL_UEoKWs_iu_jl0_cZfe7sBrb9KfO1c",
          text: "Dinner tonight? 🍕",
          sender: "other",
          timestamp: new Date(Date.now() - 3000000),
        },
      ],
    },
    {
      id: "2",
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
    {
      id: "3",
      name: "Zap Local",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Local",
      unreadCount: 0,
      type: "maps",
      isOnline: false,
      lastSeen: new Date(Date.now() - 86400000),
      messages: [
        {
          id: "m1",
          text: "Hi! I can find places on Google Maps. What are you looking for?",
          sender: "other",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "4",
      name: "Zap Studio",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Studio",
      unreadCount: 0,
      type: "video",
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600000),
      messages: [
        {
          id: "m1",
          text: "Hi! Send me an image and a prompt, and I will animate it into a video for you.",
          sender: "other",
          timestamp: new Date(),
        },
      ],
    },
  ]);

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
