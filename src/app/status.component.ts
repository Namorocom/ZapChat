import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-status",
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule],
  template: `
    <div class="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <header class="sticky top-0 z-10 bg-[#f6f8f7] dark:bg-[#122017] px-4 pt-4 pb-2">
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
            <h1 class="text-[#25d466] text-2xl font-bold tracking-tight">Updates</h1>
            <div class="flex items-center gap-4">
              <button (click)="cameraInput.click()" class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors">
                <mat-icon>photo_camera</mat-icon>
              </button>
              <button (click)="toggleSearch()" class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors">
                <mat-icon>search</mat-icon>
              </button>
              <button routerLink="/profile" class="flex items-center justify-center p-2 rounded-full hover:bg-[#25d466]/10 transition-colors">
                <mat-icon>account_circle</mat-icon>
              </button>
            </div>
          }
        </div>
      </header>

      <main class="flex-1 overflow-y-auto px-4">
        <h2 class="text-lg font-bold mb-4">Status</h2>
        
        <div (click)="cameraInput.click()" (keydown.enter)="cameraInput.click()" tabindex="0" role="button" class="flex items-center gap-4 mb-6 cursor-pointer hover:bg-slate-200 dark:hover:bg-[#25d466]/5 p-2 rounded-xl transition-colors">
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
          
          <div (click)="viewStatus('Alex')" (keydown.enter)="viewStatus('Alex')" tabindex="0" role="button" class="flex items-center gap-4 mb-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-[#25d466]/5 p-2 rounded-xl transition-colors">
            <div class="relative shrink-0 p-[2px] rounded-full bg-gradient-to-tr from-[#25d466] to-[#25d466]">
              <div class="bg-slate-300 dark:bg-slate-700 aspect-square bg-cover rounded-full h-12 w-12 border-2 border-[#f6f8f7] dark:border-[#122017]" style="background-image: url('https://picsum.photos/seed/status1/200/200')"></div>
            </div>
            <div class="flex flex-col">
              <p class="text-slate-900 dark:text-slate-100 text-base font-bold">Alex</p>
              <p class="text-slate-500 dark:text-slate-400 text-sm">45 minutes ago</p>
            </div>
          </div>

          <div (click)="viewStatus('Sarah')" (keydown.enter)="viewStatus('Sarah')" tabindex="0" role="button" class="flex items-center gap-4 mb-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-[#25d466]/5 p-2 rounded-xl transition-colors">
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

      <button (click)="openTextStatus()" class="fixed bottom-40 right-6 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 dark:bg-[#274532] text-slate-700 dark:text-slate-200 shadow-lg hover:scale-105 active:scale-95 transition-transform z-20">
        <mat-icon class="text-xl">edit</mat-icon>
      </button>

      <button (click)="cameraInput.click()" class="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#25d466] text-[#122017] shadow-lg shadow-[#25d466]/20 hover:scale-105 active:scale-95 transition-transform z-20">
        <mat-icon class="text-3xl font-bold">photo_camera</mat-icon>
      </button>

      <input type="file" accept="image/*,video/*" capture="environment" #cameraInput class="hidden" (change)="onCameraCapture($event)">

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
export class StatusComponent {
  isSearching = signal(false);
  searchQuery = signal('');

  toggleSearch() {
    this.isSearching.set(!this.isSearching());
    if (!this.isSearching()) {
      this.searchQuery.set('');
    }
  }

  onCameraCapture(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('File captured:', input.files[0]);
      alert('Photo/Video captured! (This is a demo)');
      input.value = '';
    }
  }

  viewStatus(name: string) {
    alert(`Viewing ${name}'s status...`);
  }

  openTextStatus() {
    alert('Opening text status editor...');
  }
}
