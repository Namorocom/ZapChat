import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-status",
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <header class="sticky top-0 z-10 bg-[#f6f8f7] dark:bg-[#122017] px-4 pt-4 pb-2">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-[#25d466] text-2xl font-bold tracking-tight">Updates</h1>
          <div class="flex items-center gap-4">
            <button class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors">
              <mat-icon>photo_camera</mat-icon>
            </button>
            <button class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors">
              <mat-icon>search</mat-icon>
            </button>
            <button routerLink="/profile" class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors">
              <mat-icon>account_circle</mat-icon>
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto px-4">
        <h2 class="text-lg font-bold mb-4">Status</h2>
        
        <div class="flex items-center gap-4 mb-6">
          <div class="relative shrink-0">
            <div class="bg-slate-300 dark:bg-slate-700 aspect-square bg-cover rounded-full h-14 w-14 flex items-center justify-center">
              <mat-icon class="text-slate-500 dark:text-slate-400">person</mat-icon>
            </div>
            <div class="absolute bottom-0 right-0 w-5 h-5 bg-[#25d466] border-2 border-[#f6f8f7] dark:border-[#122017] rounded-full flex items-center justify-center">
              <mat-icon class="text-[14px] text-[#122017] font-bold">add</mat-icon>
            </div>
          </div>
          <div class="flex flex-col">
            <p class="text-slate-900 dark:text-slate-100 text-base font-bold">My status</p>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Tap to add status update</p>
          </div>
        </div>

        <div class="border-t border-slate-200 dark:border-[#274532]/30 pt-4">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-4">Recent updates</p>
          
          <div class="flex items-center gap-4 mb-4">
            <div class="relative shrink-0 p-[2px] rounded-full bg-gradient-to-tr from-[#25d466] to-[#25d466]">
              <div class="bg-slate-300 dark:bg-slate-700 aspect-square bg-cover rounded-full h-12 w-12 border-2 border-[#f6f8f7] dark:border-[#122017]" style="background-image: url('https://picsum.photos/seed/status1/200/200')"></div>
            </div>
            <div class="flex flex-col">
              <p class="text-slate-900 dark:text-slate-100 text-base font-bold">Alex</p>
              <p class="text-slate-500 dark:text-slate-400 text-sm">45 minutes ago</p>
            </div>
          </div>

          <div class="flex items-center gap-4 mb-4">
            <div class="relative shrink-0 p-[2px] rounded-full bg-gradient-to-tr from-[#25d466] to-[#25d466]">
              <div class="bg-slate-300 dark:bg-slate-700 aspect-square bg-cover rounded-full h-12 w-12 border-2 border-[#f6f8f7] dark:border-[#122017]" style="background-image: url('https://picsum.photos/seed/status2/200/200')"></div>
            </div>
            <div class="flex flex-col">
              <p class="text-slate-900 dark:text-slate-100 text-base font-bold">Sarah</p>
              <p class="text-slate-500 dark:text-slate-400 text-sm">2 hours ago</p>
            </div>
          </div>
        </div>
      </main>

      <button class="fixed bottom-40 right-6 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 dark:bg-[#274532] text-slate-700 dark:text-slate-200 shadow-lg hover:scale-105 active:scale-95 transition-transform z-20">
        <mat-icon class="text-xl">edit</mat-icon>
      </button>

      <button class="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#25d466] text-[#122017] shadow-lg shadow-[#25d466]/20 hover:scale-105 active:scale-95 transition-transform z-20">
        <mat-icon class="text-3xl font-bold">photo_camera</mat-icon>
      </button>

      <footer class="sticky bottom-0 z-10 w-full border-t border-slate-200 dark:border-[#274532] bg-[#f6f8f7] dark:bg-[#1c3123] px-4 pb-6 pt-2">
        <nav class="flex justify-around items-center">
          <a routerLink="/chats" class="flex flex-1 flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors">
            <div class="flex h-8 items-center justify-center">
              <mat-icon>chat</mat-icon>
            </div>
            <p class="text-xs font-medium">Chats</p>
          </a>
          <a routerLink="/status" class="flex flex-1 flex-col items-center gap-1 text-[#25d466]">
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
  `
})
export class StatusComponent {}
