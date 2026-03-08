import { Component, inject, computed } from "@angular/core";
import { RouterLink, ActivatedRoute } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ChatService } from "./chat.service";

@Component({
  selector: "app-image-viewer",
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div
      class="relative flex h-screen w-full flex-col bg-black overflow-hidden font-sans"
    >
      <div
        class="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-black/70 to-transparent pt-4 pb-12 px-4 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <button
            routerLink="/chats/1"
            class="text-slate-100 flex items-center justify-center hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div class="flex flex-col">
            <h2
              class="text-slate-100 text-lg font-bold leading-tight tracking-tight"
            >
              Image
            </h2>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button
            (click)="action('Edit')"
            class="text-slate-100 hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <mat-icon>edit</mat-icon>
          </button>
          <button
            (click)="action('More options')"
            class="text-slate-100 hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
      </div>

      <div
        class="flex-1 w-full h-full flex items-center justify-center bg-black"
      >
        @if (imageUrl()) {
          <div
            class="w-full h-full bg-center bg-contain bg-no-repeat"
            [style.background-image]="'url(' + imageUrl() + ')'"
          ></div>
        }
      </div>

      <div
        class="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black/70 to-transparent pb-8 pt-16 px-6"
      >
        <div class="flex items-center justify-around max-w-md mx-auto">
          <div (click)="action('Share')" (keydown.enter)="action('Share')" tabindex="0" role="button" class="flex flex-col items-center gap-1 group cursor-pointer">
            <div
              class="rounded-full bg-[#25d466]/20 p-3 text-[#25d466] group-hover:bg-[#25d466] group-hover:text-white transition-all"
            >
              <mat-icon>share</mat-icon>
            </div>
            <p class="text-slate-200 text-xs font-medium">Share</p>
          </div>
          <div (click)="action('Star')" (keydown.enter)="action('Star')" tabindex="0" role="button" class="flex flex-col items-center gap-1 group cursor-pointer">
            <div
              class="rounded-full bg-[#25d466]/20 p-3 text-[#25d466] group-hover:bg-[#25d466] group-hover:text-white transition-all"
            >
              <mat-icon>star</mat-icon>
            </div>
            <p class="text-slate-200 text-xs font-medium">Star</p>
          </div>
          <div (click)="action('Save')" (keydown.enter)="action('Save')" tabindex="0" role="button" class="flex flex-col items-center gap-1 group cursor-pointer">
            <div
              class="rounded-full bg-[#25d466]/20 p-3 text-[#25d466] group-hover:bg-[#25d466] group-hover:text-white transition-all"
            >
              <mat-icon>download</mat-icon>
            </div>
            <p class="text-slate-200 text-xs font-medium">Save</p>
          </div>
          <div (click)="action('Delete')" (keydown.enter)="action('Delete')" tabindex="0" role="button" class="flex flex-col items-center gap-1 group cursor-pointer">
            <div
              class="rounded-full bg-[#25d466]/20 p-3 text-[#25d466] group-hover:bg-[#25d466] group-hover:text-white transition-all"
            >
              <mat-icon>delete</mat-icon>
            </div>
            <p class="text-slate-200 text-xs font-medium">Delete</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ImageViewerComponent {
  route = inject(ActivatedRoute);
  chatService = inject(ChatService);

  msgId = this.route.snapshot.paramMap.get("id") || "";

  imageUrl = computed(() => {
    for (const chat of this.chatService.chats()) {
      const msg = chat.messages.find((m) => m.id === this.msgId);
      if (msg && msg.imageUrl) return msg.imageUrl;
    }
    return null;
  });

  action(name: string) {
    alert(`${name} action triggered!`);
  }
}
