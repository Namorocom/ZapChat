import { Component, inject, signal, OnInit, computed } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { SupabaseService } from "./supabase.service";
import { ChatService } from "./chat.service";

@Component({
  selector: "app-new-chat",
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule],
  template: `
    <div class="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <header class="sticky top-0 z-10 bg-[#f6f8f7] dark:bg-[#122017] px-4 pt-4 pb-2 flex items-center gap-4">
        <button routerLink="/chats" class="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#25d466]/10 transition-colors">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="flex flex-col flex-1">
          <h1 class="text-lg font-bold">Select contact</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ users().length }} contacts</p>
        </div>
        <button (click)="toggleSearch()" class="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#25d466]/10 transition-colors">
          <mat-icon>search</mat-icon>
        </button>
      </header>

      @if (isSearching()) {
        <div class="px-4 py-2 bg-[#f6f8f7] dark:bg-[#122017] sticky top-[60px] z-10 border-b border-slate-200 dark:border-[#274532]/30">
          <div class="flex items-center bg-slate-200 dark:bg-[#1c3123] rounded-full px-4 py-2">
            <mat-icon class="text-slate-500 mr-2 text-sm">search</mat-icon>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Search name..."
              class="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder-slate-500"
            />
            @if (searchQuery()) {
              <button (click)="searchQuery.set('')" class="flex items-center justify-center">
                <mat-icon class="text-slate-500 text-sm">close</mat-icon>
              </button>
            }
          </div>
        </div>
      }

      <main class="flex-1 overflow-y-auto px-4 py-2">
        <div class="flex flex-col gap-4">
          @if (isLoading()) {
            <div class="flex justify-center py-10">
              <mat-icon class="animate-spin text-[#25d466]">refresh</mat-icon>
            </div>
          } @else if (errorMessage()) {
            <div class="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm text-center">
              <mat-icon class="mb-2">error_outline</mat-icon>
              <p>{{ errorMessage() }}</p>
              <p class="mt-2 text-xs opacity-80">Showing mock users instead.</p>
            </div>
          }

          @for (user of filteredUsers(); track user.id) {
            <div (click)="startChat(user)" (keydown.enter)="startChat(user)" tabindex="0" role="button" class="flex items-center gap-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-[#25d466]/5 p-2 rounded-xl transition-colors">
              <div class="relative shrink-0">
                <img [src]="user.avatar" alt="Profile" class="h-12 w-12 rounded-full object-cover bg-slate-300 dark:bg-slate-700">
              </div>
              <div class="flex flex-col flex-1 border-b border-slate-200 dark:border-[#274532]/30 pb-2">
                <p class="text-slate-900 dark:text-slate-100 text-base font-bold">{{ user.name }}</p>
                <p class="text-slate-500 dark:text-slate-400 text-sm truncate">Hey there! I am using ZapChat.</p>
              </div>
            </div>
          }

          @if (filteredUsers().length === 0) {
            <div class="flex flex-col items-center justify-center py-10 text-slate-500">
              <mat-icon class="text-4xl mb-2">person_search</mat-icon>
              <p>No contacts found</p>
            </div>
          }
        </div>
      </main>
    </div>
  `
})
export class NewChatComponent implements OnInit {
  supabase = inject(SupabaseService);
  chatService = inject(ChatService);
  router = inject(Router);

  isSearching = signal(false);
  searchQuery = signal('');
  users = signal<{id: string, name: string, avatar: string}[]>([]);
  errorMessage = signal<string | null>(null);
  isLoading = signal(true);

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.users();
    return this.users().filter(u => u.name.toLowerCase().includes(query));
  });

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      // Simulating device contacts as requested
      // In a real app, we might use the Contact Picker API if supported
      this.loadMockUsers();
    } catch (e) {
      console.error('Failed to load contacts', e);
      this.errorMessage.set('Error loading device contacts.');
    } finally {
      this.isLoading.set(false);
    }
  }

  loadMockUsers() {
    this.users.set([
      { id: 'contact1', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
      { id: 'contact2', name: 'Beatriz Silva', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz' },
      { id: 'contact3', name: 'Carlos Santos', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
      { id: 'contact4', name: 'Diana Costa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana' },
      { id: 'contact5', name: 'Eduardo Pereira', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eduardo' },
      { id: 'contact6', name: 'Fernanda Lima', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda' },
      { id: 'contact7', name: 'Gabriel Souza', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel' },
      { id: 'contact8', name: 'Helena Rocha', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helena' },
    ]);
  }

  toggleSearch() {
    this.isSearching.set(!this.isSearching());
    if (!this.isSearching()) {
      this.searchQuery.set('');
    }
  }

  startChat(user: {id: string, name: string, avatar: string}) {
    // Check if chat already exists in ChatService
    const existingChats = this.chatService.chats();
    let chat = existingChats.find(c => c.id === user.id);
    
    if (!chat) {
      // Create a new chat entry if it doesn't exist
      chat = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        unreadCount: 0,
        type: 'normal',
        isOnline: true,
        messages: []
      };
      this.chatService.chats.update(chats => [...chats, chat!]);
    }
    
    this.router.navigate(['/chats', user.id]);
  }
}
