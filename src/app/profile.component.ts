import { Component, inject, signal, OnInit } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TranslationService } from "./translation.service";
import { SupabaseService } from "./supabase.service";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { User } from "@supabase/supabase-js";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  template: `
    <div
      class="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] overflow-x-hidden font-sans"
    >
      <div class="flex items-center p-4 pb-2 justify-between bg-[#f6f8f7] dark:bg-[#122017] sticky top-0 z-10">
        <div
          routerLink="/chats"
          class="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center cursor-pointer"
        >
          <mat-icon>arrow_back</mat-icon>
        </div>
        <h2
          class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12"
        >
          Profile
        </h2>
      </div>

      <div class="px-4 py-8 flex flex-col items-center">
        <div class="relative mb-8">
          <div class="bg-slate-300 dark:bg-slate-700 aspect-square bg-cover rounded-full h-32 w-32 flex items-center justify-center overflow-hidden">
            @if (user()?.user_metadata?.['avatar_url']) {
              <img [src]="user()?.user_metadata?.['avatar_url']" alt="Profile" class="w-full h-full object-cover" />
            } @else {
              <mat-icon class="text-slate-500 dark:text-slate-400 text-6xl" style="width: 60px; height: 60px; font-size: 60px;">person</mat-icon>
            }
          </div>
          <button class="absolute bottom-0 right-0 w-10 h-10 bg-[#25d466] text-[#122017] rounded-full flex items-center justify-center shadow-lg hover:bg-[#25d466]/90 transition-colors">
            <mat-icon>photo_camera</mat-icon>
          </button>
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6 w-full max-w-[480px]">
          <div class="flex flex-col w-full">
            <label
              for="fullName"
              class="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal pb-2"
            >Name</label>
            <div class="flex items-center gap-2">
              <mat-icon class="text-slate-500 dark:text-slate-400">person</mat-icon>
              <input
                id="fullName"
                formControlName="fullName"
                class="flex w-full border-b-2 border-slate-300 dark:border-[#274532] bg-transparent h-10 text-slate-900 dark:text-white focus:outline-none focus:border-[#25d466] transition-colors text-base font-normal"
                placeholder="Your name"
                type="text"
              />
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-8">This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
          </div>

          <div class="flex flex-col w-full">
            <label
              for="email"
              class="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal pb-2"
            >Email</label>
            <div class="flex items-center gap-2">
              <mat-icon class="text-slate-500 dark:text-slate-400">email</mat-icon>
              <input
                id="email"
                formControlName="email"
                class="flex w-full border-b-2 border-slate-300 dark:border-[#274532] bg-transparent h-10 text-slate-900 dark:text-white focus:outline-none focus:border-[#25d466] transition-colors text-base font-normal"
                placeholder="Your email"
                type="email"
              />
            </div>
          </div>

          <div class="flex flex-col w-full">
            <label
              for="about"
              class="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal pb-2"
            >About</label>
            <div class="flex items-center gap-2">
              <mat-icon class="text-slate-500 dark:text-slate-400">info</mat-icon>
              <input
                id="about"
                formControlName="about"
                class="flex w-full border-b-2 border-slate-300 dark:border-[#274532] bg-transparent h-10 text-slate-900 dark:text-white focus:outline-none focus:border-[#25d466] transition-colors text-base font-normal"
                placeholder="Hey there! I am using ZapChat."
                type="text"
              />
            </div>
          </div>

          @if (successMessage()) {
            <div class="text-[#25d466] text-sm font-medium pt-2 text-center">
              {{ successMessage() }}
            </div>
          }

          @if (errorMessage()) {
            <div class="text-red-500 text-sm font-medium pt-2 text-center">
              {{ errorMessage() }}
            </div>
          }

          <div class="pt-8">
            <button
              type="submit"
              [disabled]="profileForm.invalid || isLoading() || profileForm.pristine"
              class="w-full bg-[#25d466] hover:bg-[#25d466]/90 disabled:opacity-50 disabled:cursor-not-allowed text-[#122017] font-bold text-base h-14 rounded-full transition-colors flex items-center justify-center"
            >
              @if (isLoading()) {
                <mat-icon class="animate-spin">refresh</mat-icon>
              } @else {
                Save Changes
              }
            </button>
          </div>

          <div class="pt-4">
            <button
              type="button"
              (click)="onSignOut()"
              class="w-full bg-transparent border border-red-500 text-red-500 hover:bg-red-500/10 font-bold text-base h-14 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <mat-icon>logout</mat-icon>
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  ts = inject(TranslationService);
  supabase = inject(SupabaseService);
  router = inject(Router);
  fb = inject(FormBuilder);

  user = signal<User | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  profileForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    about: ['Hey there! I am using ZapChat.']
  });

  ngOnInit() {
    this.supabase.currentUser.subscribe(user => {
      this.user.set(user);
      if (user) {
        this.profileForm.patchValue({
          email: user.email,
          fullName: user.user_metadata?.['full_name'] || '',
          about: user.user_metadata?.['about'] || 'Hey there! I am using ZapChat.'
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async onSubmit() {
    if (this.profileForm.invalid) return;
    
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    
    const { fullName, about, email } = this.profileForm.value;
    
    const { error } = await this.supabase.client.auth.updateUser({
      email: email!,
      data: { 
        full_name: fullName,
        about: about
      }
    });
    
    this.isLoading.set(false);
    
    if (error) {
      this.errorMessage.set(error.message);
    } else {
      this.successMessage.set('Profile updated successfully!');
      this.profileForm.markAsPristine();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage.set('');
      }, 3000);
    }
  }

  async onSignOut() {
    await this.supabase.signOut();
    this.router.navigate(['/']);
  }
}
