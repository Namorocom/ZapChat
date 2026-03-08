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
      // Fetch users from profiles table if it exists
      const { data, error } = await this.supabase.client
        .from('profiles')
        .select('*');
        
      if (error) {
        console.error('Error fetching users:', error);
        return;
      }
      
      if (data) {
        const currentUser = await this.supabase.client.auth.getUser();
        const currentUserId = currentUser.data.user?.id;
        
        const userChats: Chat[] = data
          .filter(profile => profile.id !== currentUserId)
          .map(profile => ({
            id: profile.id,
            name: profile.full_name || profile.username || 'Unknown User',
            avatar: profile.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + profile.id,
            unreadCount: 0,
            type: 'normal',
            isOnline: true,
            messages: []
          }));
          
        this.chats.set(userChats);
      }
    } catch (e) {
      console.error('Failed to load users', e);
    }
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
