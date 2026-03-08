import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div
      class="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] overflow-x-hidden font-sans"
    >
      <div class="flex items-center p-4 pb-2 justify-between">
        <div
          routerLink="/login"
          class="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center cursor-pointer"
        >
          <mat-icon>arrow_back</mat-icon>
        </div>
        <h2
          class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12"
        >
          Create account
        </h2>
      </div>

      <div class="px-6 pt-8 pb-4">
        <h1
          class="text-slate-900 dark:text-slate-100 tracking-tight text-[28px] font-bold leading-tight text-left"
        >
          Join the conversation
        </h1>
        <p class="text-slate-600 dark:text-[#25d466]/70 text-base mt-2">
          Enter your details to get started with our secure messaging.
        </p>
      </div>

      <div class="flex flex-col gap-1 px-4 py-3 w-full max-w-md mx-auto">
        <div class="flex flex-wrap items-end gap-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p
              class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2 ml-1"
            >
              Full name
            </p>
            <input
              class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#25d466]/50 border border-slate-300 dark:border-[#25d466]/20 bg-white dark:bg-[#25d466]/10 focus:border-[#25d466] h-14 placeholder:text-slate-400 dark:placeholder:text-[#25d466]/40 p-[15px] text-base font-normal leading-normal transition-all"
              placeholder="e.g. Alex Johnson"
              type="text"
            />
          </label>
        </div>

        <div class="flex flex-wrap items-end gap-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p
              class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2 ml-1"
            >
              Phone number or Email
            </p>
            <input
              class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#25d466]/50 border border-slate-300 dark:border-[#25d466]/20 bg-white dark:bg-[#25d466]/10 focus:border-[#25d466] h-14 placeholder:text-slate-400 dark:placeholder:text-[#25d466]/40 p-[15px] text-base font-normal leading-normal transition-all"
              placeholder="+1 123 456 7890"
              type="text"
            />
          </label>
        </div>

        <div class="flex flex-wrap items-end gap-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p
              class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2 ml-1"
            >
              Password
            </p>
            <div
              class="flex w-full flex-1 items-stretch rounded-xl overflow-hidden border border-slate-300 dark:border-[#25d466]/20 bg-white dark:bg-[#25d466]/10 focus-within:ring-2 focus-within:ring-[#25d466]/50 focus-within:border-[#25d466] transition-all"
            >
              <input
                class="flex w-full min-w-0 flex-1 resize-none overflow-hidden border-none bg-transparent h-14 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#25d466]/40 p-[15px] pr-2 text-base font-normal leading-normal focus:ring-0 outline-none"
                placeholder="Min. 8 characters"
                type="password"
              />
              <div
                class="text-slate-500 dark:text-[#25d466]/60 flex items-center justify-center pr-[15px] cursor-pointer"
              >
                <mat-icon>visibility</mat-icon>
              </div>
            </div>
          </label>
        </div>

        <div class="flex flex-wrap items-end gap-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p
              class="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal pb-2 ml-1"
            >
              Confirm Password
            </p>
            <div
              class="flex w-full flex-1 items-stretch rounded-xl overflow-hidden border border-slate-300 dark:border-[#25d466]/20 bg-white dark:bg-[#25d466]/10 focus-within:ring-2 focus-within:ring-[#25d466]/50 focus-within:border-[#25d466] transition-all"
            >
              <input
                class="flex w-full min-w-0 flex-1 resize-none overflow-hidden border-none bg-transparent h-14 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#25d466]/40 p-[15px] pr-2 text-base font-normal leading-normal focus:ring-0 outline-none"
                placeholder="Repeat password"
                type="password"
              />
              <div
                class="text-slate-500 dark:text-[#25d466]/60 flex items-center justify-center pr-[15px] cursor-pointer"
              >
                <mat-icon>visibility</mat-icon>
              </div>
            </div>
          </label>
        </div>

        <div class="px-1 py-2 mb-4">
          <p
            class="text-xs text-slate-500 dark:text-[#25d466]/40 leading-relaxed"
          >
            By signing up, you agree to our
            <span class="text-[#25d466] font-medium cursor-pointer"
              >Terms of Service</span
            >
            and
            <span class="text-[#25d466] font-medium cursor-pointer"
              >Privacy Policy</span
            >.
          </p>
        </div>

        <div class="py-2">
          <button
            routerLink="/chats"
            class="w-full bg-[#25d466] hover:bg-[#25d466]/90 text-[#122017] font-bold py-4 rounded-xl shadow-lg shadow-[#25d466]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Sign Up</span>
            <mat-icon class="text-xl">arrow_forward</mat-icon>
          </button>
        </div>

        <div class="mt-6 flex flex-col items-center gap-4">
          <p class="text-slate-600 dark:text-slate-400 text-sm">
            Already have an account?
            <a
              routerLink="/login"
              class="text-[#25d466] font-bold hover:underline ml-1"
              >Log in</a
            >
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {}
