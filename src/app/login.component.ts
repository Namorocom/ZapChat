import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TranslationService } from "./translation.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div
      class="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] overflow-x-hidden font-sans"
    >
      <div class="flex items-center p-4 pb-2 justify-between">
        <div
          routerLink="/"
          class="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center cursor-pointer"
        >
          <mat-icon>arrow_back</mat-icon>
        </div>
        <h2
          class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12"
        >
          {{ ts.t().logIn }}
        </h2>
      </div>
      <div class="px-4 py-8 flex flex-col items-center text-center">
        <h1
          class="text-slate-900 dark:text-slate-100 tracking-tight text-[32px] font-bold leading-tight pb-2"
        >
          {{ ts.t().welcomeBack }}
        </h1>
        <p
          class="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-6 max-w-[480px]"
        >
          {{ ts.t().enterDetails }}
        </p>

        <div class="space-y-4 w-full max-w-[480px] text-left">
          <div class="flex flex-col w-full">
            <label
              for="phoneOrEmail"
              class="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal pb-2"
              >{{ ts.t().phoneOrEmail }}</label
            >
            <input
              id="phoneOrEmail"
              class="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#25d466] border-none bg-slate-200 dark:bg-[#25d466]/10 h-14 placeholder:text-slate-500 dark:placeholder:text-[#25d466]/40 p-4 text-base font-normal"
              placeholder="e.g. +1 234 567 890"
              type="text"
            />
          </div>
          <div class="flex flex-col w-full">
            <div class="flex justify-between items-center pb-2">
              <label
                for="password"
                class="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal"
                >{{ ts.t().password }}</label
              >
              <a
                class="text-[#25d466] text-sm font-medium hover:underline"
                href="#"
                >{{ ts.t().forgotPassword }}</a
              >
            </div>
            <div
              class="flex w-full items-stretch rounded-lg bg-slate-200 dark:bg-[#25d466]/10 overflow-hidden focus-within:ring-2 focus-within:ring-[#25d466]"
            >
              <input
                id="password"
                class="flex w-full min-w-0 flex-1 border-none bg-transparent h-14 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-[#25d466]/40 p-4 text-base font-normal focus:ring-0 outline-none"
                placeholder="••••••••"
                type="password"
              />
              <div
                class="text-slate-500 dark:text-[#25d466]/60 flex items-center justify-center px-4 cursor-pointer"
              >
                <mat-icon>visibility</mat-icon>
              </div>
            </div>
          </div>
          <div class="pt-4">
            <button
              routerLink="/chats"
              class="w-full bg-[#25d466] hover:bg-[#25d466]/90 text-[#122017] font-bold text-base h-14 rounded-full transition-colors"
            >
              {{ ts.t().logIn }}
            </button>
          </div>

          <div class="flex items-center py-6">
            <div
              class="flex-grow border-t border-slate-300 dark:border-[#25d466]/20"
            ></div>
            <span class="px-4 text-slate-500 dark:text-slate-400 text-sm"
              >{{ ts.t().orContinueWith }}</span
            >
            <div
              class="flex-grow border-t border-slate-300 dark:border-[#25d466]/20"
            ></div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              class="flex items-center justify-center gap-2 h-12 rounded-lg border border-slate-300 dark:border-[#25d466]/20 bg-transparent hover:bg-slate-100 dark:hover:bg-[#25d466]/5 transition-colors"
            >
              <img
                class="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu4cppA_uiv60eZhBcKKejO1yA9PFK0lKPnp5GrC8T8nxpnNY3CBXhVRqitxp8y1zktu69A3y9F7LFopNnLEnhx7g8IdpiEVV0RukoisykqE99fTPEOF0K5TaKAlt48PmT30BMn4M0YBz4xQI5Kkxj22JRP1LTbkErYM7PNn0k9D_o6ErK0j1czd7j9ZIwFkcTk4Ki0b8cl3ZWfoln4usc91h0F0CdiXpPBOE3HzJSpFzXh-8cctEJc0cE3HHRD0WM_jbJNcdv_5E"
                alt="Google logo"
              />
              <span class="text-sm font-medium">Google</span>
            </button>
            <button
              class="flex items-center justify-center gap-2 h-12 rounded-lg border border-slate-300 dark:border-[#25d466]/20 bg-transparent hover:bg-slate-100 dark:hover:bg-[#25d466]/5 transition-colors"
            >
              <mat-icon class="text-blue-600">social_leaderboard</mat-icon>
              <span class="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>

        <div class="mt-auto pt-12 pb-6 text-center">
          <p class="text-slate-600 dark:text-slate-400 text-sm">
            {{ ts.t().dontHaveAccount }}
            <a
              routerLink="/signup"
              class="text-[#25d466] font-bold hover:underline"
              >{{ ts.t().signUp }}</a
            >
          </p>
        </div>
      </div>
      <div
        class="fixed bottom-0 left-0 w-full h-1 bg-[#25d466]/30 blur-xl"
      ></div>
    </div>
  `,
})
export class LoginComponent {
  ts = inject(TranslationService);
}
