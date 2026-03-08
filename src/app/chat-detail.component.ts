import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from "@angular/core";
import { RouterLink, ActivatedRoute } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ChatService, Message } from "./chat.service";
import { GeminiService } from "./gemini.service";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-chat-detail",
  standalone: true,
  imports: [RouterLink, MatIconModule, DatePipe, FormsModule],
  template: `
    <div
      class="relative flex h-screen w-full flex-col overflow-hidden bg-[#f6f8f7] dark:bg-[#122017] font-sans text-slate-900 dark:text-slate-100"
    >
      <header
        class="flex items-center justify-between px-4 py-3 bg-[#f6f8f7] dark:bg-[#1c2e22] border-b border-slate-200 dark:border-[#25d466]/10 shadow-sm z-10"
      >
        <div class="flex items-center gap-3">
          <button
            routerLink="/chats"
            class="flex items-center justify-center p-1 rounded-full hover:bg-slate-200 dark:hover:bg-[#25d466]/20 transition-colors"
          >
            <mat-icon class="text-slate-700 dark:text-slate-200"
              >arrow_back</mat-icon
            >
          </button>
          <div class="relative">
            <div
              class="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden border border-[#25d466]/20"
            >
              <img
                class="w-full h-full object-cover"
                [src]="chat()?.avatar"
                alt="Avatar"
              />
            </div>
            @if (chat()?.isOnline) {
              <div
                class="absolute bottom-0 right-0 w-3 h-3 bg-[#25d466] border-2 border-[#f6f8f7] dark:border-[#1c2e22] rounded-full"
              ></div>
            }
          </div>
          <div class="flex flex-col">
            <h1
              class="text-sm font-bold leading-none text-slate-900 dark:text-slate-50"
            >
              {{ chat()?.name }}
            </h1>
            @if (chat()?.isOnline) {
              <span class="text-[11px] font-medium text-[#25d466]">Online</span>
            } @else if (chat()?.lastSeen) {
              <span class="text-[11px] font-medium text-slate-500">Last seen {{ chat()?.lastSeen | date: 'shortTime' }}</span>
            }
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            (click)="simulateCall('video')"
            class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#25d466]/20 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <mat-icon>videocam</mat-icon>
          </button>
          <button
            (click)="simulateCall('audio')"
            class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#25d466]/20 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <mat-icon>call</mat-icon>
          </button>
          <button
            (click)="showMoreOptions()"
            class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#25d466]/20 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
      </header>

      <main
        #scrollContainer
        class="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 dark:bg-[#122017]/50"
      >
        <div class="flex flex-col items-center my-4">
          <span
            class="px-3 py-1 rounded-full bg-slate-200 dark:bg-[#25d466]/10 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-[#25d466]/70"
            >Today</span
          >
        </div>

        @for (msg of chat()?.messages; track msg.id) {
          <div
            class="flex items-end gap-2 max-w-[85%]"
            [class.self-end]="msg.sender === 'me'"
          >
            <div
              class="flex-1 flex flex-col"
              [class.items-end]="msg.sender === 'me'"
            >
              <div
                class="px-4 py-2.5 rounded-2xl shadow-sm text-sm"
                [class.bg-white]="msg.sender !== 'me'"
                [class.dark:bg-[#2a3d31]]="msg.sender !== 'me'"
                [class.text-slate-800]="msg.sender !== 'me'"
                [class.dark:text-slate-100]="msg.sender !== 'me'"
                [class.border]="msg.sender !== 'me'"
                [class.border-slate-100]="msg.sender !== 'me'"
                [class.dark:border-[#25d466]/5]="msg.sender !== 'me'"
                [class.rounded-bl-none]="msg.sender !== 'me'"
                [class.bg-[#25d466]]="msg.sender === 'me'"
                [class.text-[#122017]]="msg.sender === 'me'"
                [class.font-medium]="msg.sender === 'me'"
                [class.rounded-br-none]="msg.sender === 'me'"
              >
                @if (msg.imageUrl) {
                  <div
                    class="rounded-xl overflow-hidden aspect-square shadow-inner mb-2 cursor-pointer"
                    [routerLink]="['/image', msg.id]"
                  >
                    <img
                      [src]="msg.imageUrl"
                      class="w-full h-full object-cover"
                      alt="Message image"
                    />
                  </div>
                }

                @if (msg.videoUrl) {
                  <div
                    class="relative rounded-xl overflow-hidden aspect-video bg-slate-900 group cursor-pointer mb-2"
                  >
                    <video
                      [src]="msg.videoUrl"
                      class="w-full h-full object-cover opacity-80"
                      controls
                      autoplay
                      loop
                      muted
                    ></video>
                  </div>
                }

                @if (msg.text) {
                  <div>{{ msg.text }}</div>
                }

                @if (msg.isGenerating) {
                  <div class="flex items-center gap-1 mt-1">
                    <div
                      class="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                    ></div>
                    <div
                      class="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                      style="animation-delay: 0.2s"
                    ></div>
                    <div
                      class="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                      style="animation-delay: 0.4s"
                    ></div>
                  </div>
                }

                @if (msg.groundingUrls && msg.groundingUrls.length > 0) {
                  <div
                    class="mt-2 pt-2 border-t border-current/20 text-xs opacity-80"
                  >
                    <p class="font-semibold mb-1">Sources:</p>
                    <ul class="list-disc pl-4">
                      @for (url of msg.groundingUrls; track url.uri) {
                        <li>
                          <a
                            [href]="url.uri"
                            target="_blank"
                            class="underline hover:opacity-100"
                            >{{ url.title || url.uri }}</a
                          >
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>

              <div
                class="flex items-center gap-1 mt-1"
                [class.mr-1]="msg.sender === 'me'"
                [class.ml-1]="msg.sender !== 'me'"
              >
                <span class="text-[10px] text-slate-500 dark:text-slate-400">{{
                  msg.timestamp | date: "shortTime"
                }}</span>
                @if (msg.sender === "me") {
                  <mat-icon class="text-[14px] text-[#25d466]"
                    >done_all</mat-icon
                  >
                }
              </div>
            </div>
          </div>
        }
      </main>

      <footer
        class="p-3 bg-[#f6f8f7] dark:bg-[#122017] border-t border-slate-200 dark:border-[#25d466]/10"
      >
        <div class="flex items-center gap-2 max-w-4xl mx-auto">
          <div
            class="flex-1 flex items-center bg-slate-100 dark:bg-[#1c2e22] rounded-full px-3 py-1 border border-transparent focus-within:border-[#25d466]/30 transition-all"
          >
            <button
              (click)="toggleEmoji()"
              class="p-2 text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors"
            >
              <mat-icon>mood</mat-icon>
            </button>
            <input
              [(ngModel)]="newMessage"
              (keyup.enter)="sendMessage()"
              class="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 outline-none"
              placeholder="Type a message"
              type="text"
            />

            <div class="relative group">
              <button
                (click)="fileInput.click()"
                class="p-2 text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors"
              >
                <mat-icon>attach_file</mat-icon>
              </button>
            </div>

            <button
              (click)="cameraInput.click()"
              class="p-2 text-slate-500 dark:text-slate-400 hover:text-[#25d466] transition-colors"
            >
              <mat-icon>photo_camera</mat-icon>
            </button>
            <input
              type="file"
              #fileInput
              class="hidden"
              accept="*/*"
              (change)="onFileSelected($event)"
            />
            <input
              type="file"
              #cameraInput
              class="hidden"
              accept="image/*,video/*"
              capture="environment"
              (change)="onFileSelected($event)"
            />
          </div>
          <button
            (click)="handleAction()"
            class="flex items-center justify-center size-12 rounded-full bg-[#25d466] text-[#122017] shadow-lg shadow-[#25d466]/20 hover:scale-105 active:scale-95 transition-transform"
          >
            <mat-icon class="font-bold">{{
              newMessage || selectedFile ? "send" : "mic"
            }}</mat-icon>
          </button>
        </div>
        @if (selectedFile) {
          <div
            class="mt-2 px-4 py-2 bg-slate-200 dark:bg-[#1c2e22] rounded-lg flex items-center justify-between"
          >
            <span class="text-sm truncate">{{ selectedFile.name }}</span>
            <button
              (click)="selectedFile = null; selectedFileBase64 = null"
              class="text-red-500"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>
        }
      </footer>
    </div>
  `,
})
export class ChatDetailComponent implements AfterViewChecked {
  route = inject(ActivatedRoute);
  chatService = inject(ChatService);
  geminiService = inject(GeminiService);

  chatId = this.route.snapshot.paramMap.get("id") || "";
  chat = this.chatService.getChat(this.chatId);

  newMessage = "";
  selectedFile: File | null = null;
  selectedFileBase64: string | null = null;

  @ViewChild("scrollContainer") private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  simulateCall(type: 'audio' | 'video') {
    alert(`Starting ${type} call with ${this.chat()?.name}...`);
  }

  showMoreOptions() {
    alert('More options: View contact, Media, Search, Mute notifications, Disappearing messages, Wallpaper, More');
  }

  toggleEmoji() {
    alert('Emoji picker would open here.');
  }

  handleAction() {
    if (this.newMessage || this.selectedFile) {
      this.sendMessage();
    } else {
      alert('Recording voice message... (Simulated)');
    }
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch {
      // ignore
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = (reader.result as string).split(",")[1];
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async sendMessage() {
    if (!this.newMessage.trim() && !this.selectedFile) return;

    const text = this.newMessage;
    const file = this.selectedFile;
    const fileBase64 = this.selectedFileBase64;

    this.newMessage = "";
    this.selectedFile = null;
    this.selectedFileBase64 = null;

    const myMsgId = Math.random().toString(36).substring(7);

    // Add my message
    const myMsg: Message = {
      id: myMsgId,
      text: text,
      sender: "me",
      timestamp: new Date(),
    };

    if (file && fileBase64) {
      myMsg.imageUrl = "data:" + file.type + ";base64," + fileBase64;
    }

    this.chatService.addMessage(this.chatId, myMsg);

    const currentChat = this.chat();
    if (!currentChat || currentChat.type === "normal") return;

    // AI Response
    const aiMsgId = Math.random().toString(36).substring(7);
    this.chatService.addMessage(this.chatId, {
      id: aiMsgId,
      sender: "other",
      timestamp: new Date(),
      isGenerating: true,
    });

    try {
      if (currentChat.type === "search") {
        const res = await this.geminiService.search(text);
        this.chatService.updateMessage(this.chatId, aiMsgId, {
          text: res.text,
          groundingUrls: res.groundingUrls,
          isGenerating: false,
        });
      } else if (currentChat.type === "maps") {
        // Mocking location to SF for example
        const res = await this.geminiService.maps(text, 37.7749, -122.4194);
        this.chatService.updateMessage(this.chatId, aiMsgId, {
          text: res.text,
          groundingUrls: res.groundingUrls,
          isGenerating: false,
        });
      } else if (currentChat.type === "video") {
        if (fileBase64 && file) {
          const videoUrl = await this.geminiService.generateVideo(
            text,
            fileBase64,
            file.type,
          );
          this.chatService.updateMessage(this.chatId, aiMsgId, {
            videoUrl: videoUrl,
            text: "Here is your generated video!",
            isGenerating: false,
          });
        } else {
          this.chatService.updateMessage(this.chatId, aiMsgId, {
            text: "Please attach an image to generate a video.",
            isGenerating: false,
          });
        }
      }
    } catch (error) {
      this.chatService.updateMessage(this.chatId, aiMsgId, {
        text:
          "Sorry, an error occurred: " +
          (error instanceof Error ? error.message : String(error)),
        isGenerating: false,
      });
    }
  }
}
