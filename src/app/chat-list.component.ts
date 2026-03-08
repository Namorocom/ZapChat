import { Component, inject, signal, computed } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ChatService } from "./chat.service";
import { DatePipe, AsyncPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SupabaseService } from "./supabase.service";

@Component({
  selector: "app-chat-list",
  standalone: true,
  imports: [RouterLink, MatIconModule, DatePipe, FormsModule, AsyncPipe],
  template: `
    <div
      class="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden"
    >
      <header
        class="sticky top-0 z-10 bg-[#f6f8f7] dark:bg-[#122017] px-4 pt-4 pb-2"
      >
        <div class="flex items-center justify-between mb-4">
          @if (isSearching()) {
            <div class="flex items-center w-full gap-2 bg-[#274532]/30 rounded-full px-4 py-1">
              <button (click)="toggleSearch()" class="flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors">
                <mat-icon>arrow_back</mat-icon>
              </button>
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                placeholder="Search..." 
                class="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-400 text-base"
              />
              @if (searchQuery()) {
                <button (click)="searchQuery.set('')" class="flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors">
                  <mat-icon>close</mat-icon>
                </button>
              }
            </div>
          } @else {
            <h1 class="text-[#25d466] text-2xl font-bold tracking-tight">
              ZapChat
            </h1>
            <div class="flex items-center gap-4">
              <button
                (click)="cameraInput.click()"
                class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors"
              >
                <mat-icon>photo_camera</mat-icon>
              </button>
              <button
                (click)="toggleSearch()"
                class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors"
              >
                <mat-icon>search</mat-icon>
              </button>
              <button
                routerLink="/profile"
                class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors"
              >
                @if (supabase.currentUser | async; as user) {
                  @if (user.user_metadata?.['avatar_url']) {
                    <img [src]="user.user_metadata?.['avatar_url']" alt="Profile" class="w-6 h-6 rounded-full object-cover border border-[#25d466]">
                  } @else {
                    <mat-icon>account_circle</mat-icon>
                  }
                } @else {
                  <mat-icon>account_circle</mat-icon>
                }
              </button>
            </div>
          }
        </div>
        <div class="flex border-b border-[#274532]/30 gap-8">
          <a
            routerLink="/chats"
            class="flex flex-col items-center justify-center border-b-[3px] border-[#25d466] text-[#25d466] pb-3 pt-2"
          >
            <p class="text-sm font-bold uppercase tracking-wider">Chats</p>
          </a>
          <a
            routerLink="/status"
            class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors pb-3 pt-2"
          >
            <p class="text-sm font-bold uppercase tracking-wider">Status</p>
          </a>
          <a
            routerLink="/calls"
            class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors pb-3 pt-2"
          >
            <p class="text-sm font-bold uppercase tracking-wider">Calls</p>
          </a>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto">
        <div class="flex flex-col">
          @for (chat of filteredChats(); track chat.id) {
            <div
              [routerLink]="['/chats', chat.id]"
              class="flex items-center gap-4 bg-transparent px-4 py-3 hover:bg-[#25d466]/5 cursor-pointer"
            >
              <div class="relative shrink-0">
                <div
                  class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 border border-[#274532]"
                  [style.background-image]="'url(' + chat.avatar + ')'"
                ></div>
                @if (chat.isOnline) {
                  <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25d466] border-2 border-[#122017] rounded-full"></div>
                }
              </div>
              <div
                class="flex flex-1 flex-col justify-center overflow-hidden border-b border-[#274532]/20 pb-3"
              >
                <div class="flex justify-between items-center mb-1">
                  <div class="flex items-center gap-2 truncate">
                    <p class="text-slate-100 text-base font-bold truncate">
                      {{ chat.name }}
                    </p>
                    @if (!chat.isOnline && chat.lastSeen) {
                      <span class="text-xs text-slate-500 truncate">Last seen {{ chat.lastSeen | date: 'shortTime' }}</span>
                    }
                  </div>
                  <p class="text-[#25d466] text-xs font-medium">
                    {{
                      chat.lastMessageTime
                        ? (chat.lastMessageTime | date: "shortTime")
                        : ""
                    }}
                  </p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-slate-400 text-sm truncate pr-4">
                    {{ chat.lastMessage || "Start chatting..." }}
                  </p>
                  @if (chat.unreadCount > 0) {
                    <div
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-[#25d466] shrink-0"
                    >
                      <span class="text-[10px] font-bold text-[#122017]">{{
                        chat.unreadCount
                      }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </main>

      <button
        (click)="newChat()"
        class="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#25d466] text-[#122017] shadow-lg shadow-[#25d466]/20 hover:scale-105 active:scale-95 transition-transform z-20"
      >
        <mat-icon class="text-3xl font-bold">chat</mat-icon>
      </button>

      <input type="file" accept="image/*,video/*" capture="environment" #cameraInput class="hidden" (change)="onCameraCapture($event)">

      <footer
        class="sticky bottom-0 z-10 w-full border-t border-[#274532] bg-[#1c3123] px-4 pb-6 pt-2"
      >
        <nav class="flex justify-around items-center">
          <a routerLink="/chats" class="flex flex-1 flex-col items-center gap-1 text-[#25d466]">
            <div class="flex h-8 items-center justify-center">
              <mat-icon>chat</mat-icon>
            </div>
            <p class="text-xs font-medium">Chats</p>
          </a>
          <a routerLink="/status" class="flex flex-1 flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors">
            <div class="flex h-8 items-center justify-center">
              <mat-icon>update</mat-icon>
            </div>
            <p class="text-xs font-medium">Updates</p>
          </a>
          <a routerLink="/calls" class="flex flex-1 flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors">
            <div class="flex h-8 items-center justify-center">
              <mat-icon>call</mat-icon>
            </div>
            <p class="text-xs font-medium">Calls</p>
          </a>
        </nav>
      </footer>
    </div>
  `,
})
export class ChatListComponent {
  chatService = inject(ChatService);
  supabase = inject(SupabaseService);
  router = inject(Router);
  
  isSearching = signal(false);
  searchQuery = signal('');

  filteredChats = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const chats = this.chatService.chats();
    if (!query) return chats;
    return chats.filter(chat => chat.name?.toLowerCase().includes(query) || (chat.lastMessage && chat.lastMessage.toLowerCase().includes(query)));
  });

  toggleSearch() {
    this.isSearching.set(!this.isSearching());
    if (!this.isSearching()) {
      this.searchQuery.set('');
    }
  }

  onCameraCapture(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // In a real app, we would upload this file or navigate to a send screen
      console.log('File captured:', input.files[0]);
      alert('Photo/Video captured! (This is a demo)');
      input.value = ''; // Reset input
    }
  }

  newChat() {
    this.router.navigate(['/new-chat']);
  }
}
