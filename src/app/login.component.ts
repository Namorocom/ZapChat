import { Component, inject, signal } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TranslationService } from "./translation.service";
import { SupabaseService } from "./supabase.service";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
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

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4 w-full max-w-[480px] text-left">
          <div class="flex flex-col w-full">
            <label
              for="phoneOrEmail"
              class="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal pb-2"
              >{{ ts.t().phoneOrEmail }}</label
            >
            <input
              id="phoneOrEmail"
              formControlName="email"
              class="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#25d466] border-none bg-slate-200 dark:bg-[#25d466]/10 h-14 placeholder:text-slate-500 dark:placeholder:text-[#25d466]/40 p-4 text-base font-normal"
              placeholder="e.g. email@example.com"
              type="email"
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
                formControlName="password"
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
          
          @if (errorMessage()) {
            <div class="text-red-500 text-sm font-medium pt-2">
              {{ errorMessage() }}
            </div>
          }

          <div class="pt-4">
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading()"
              class="w-full bg-[#25d466] hover:bg-[#25d466]/90 disabled:opacity-50 disabled:cursor-not-allowed text-[#122017] font-bold text-base h-14 rounded-full transition-colors flex items-center justify-center"
            >
              @if (isLoading()) {
                <mat-icon class="animate-spin">refresh</mat-icon>
              } @else {
                {{ ts.t().logIn }}
              }
            </button>
          </div>
        </form>

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
  supabase = inject(SupabaseService);
  router = inject(Router);
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = signal(false);
  errorMessage = signal('');

  async onSubmit() {
    if (this.loginForm.invalid) return;
    
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    const { email, password } = this.loginForm.value;
    
    const { error } = await this.supabase.signIn(email!, password!);
    
    this.isLoading.set(false);
    
    if (error) {
      this.errorMessage.set(error.message);
    } else {
      this.router.navigate(['/chats']);
    }
  }
}
