import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ChatService } from "./chat.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-chat-list",
  standalone: true,
  imports: [RouterLink, MatIconModule, DatePipe],
  template: `
    <div
      class="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden"
    >
      <header
        class="sticky top-0 z-10 bg-[#f6f8f7] dark:bg-[#122017] px-4 pt-4 pb-2"
      >
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-[#25d466] text-2xl font-bold tracking-tight">
            ZapChat
          </h1>
          <div class="flex items-center gap-4">
            <button
              class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors"
            >
              <mat-icon>photo_camera</mat-icon>
            </button>
            <button
              class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors"
            >
              <mat-icon>search</mat-icon>
            </button>
            <button
              routerLink="/profile"
              class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors"
            >
              <mat-icon>account_circle</mat-icon>
            </button>
          </div>
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
          @for (chat of chatService.chats(); track chat.id) {
            <div
              [routerLink]="['/chats', chat.id]"
              class="flex items-center gap-4 bg-transparent px-4 py-3 hover:bg-[#25d466]/5 cursor-pointer"
            >
              <div class="relative shrink-0">
                <div
                  class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 border border-[#274532]"
                  [style.background-image]="'url(' + chat.avatar + ')'"
                ></div>
              </div>
              <div
                class="flex flex-1 flex-col justify-center overflow-hidden border-b border-[#274532]/20 pb-3"
              >
                <div class="flex justify-between items-center mb-1">
                  <p class="text-slate-100 text-base font-bold truncate">
                    {{ chat.name }}
                  </p>
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
        class="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#25d466] text-[#122017] shadow-lg shadow-[#25d466]/20 hover:scale-105 active:scale-95 transition-transform z-20"
      >
        <mat-icon class="text-3xl font-bold">chat</mat-icon>
      </button>

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
}
