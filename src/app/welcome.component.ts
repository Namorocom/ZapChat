import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TranslationService } from "./translation.service";

@Component({
  selector: "app-welcome",
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div
      class="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f8f7] dark:bg-[#122017] overflow-x-hidden font-sans"
    >
      <div class="flex items-center p-4 pb-2 justify-between">
        <div class="w-12"></div>
        <h2
          class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center"
        >
          ZapChat
        </h2>
        <div class="w-12"></div>
      </div>

      <div class="flex w-full grow p-4 flex-col items-center justify-center">
        <div
          class="w-full max-w-[340px] aspect-square rounded-full bg-[#25d466]/10 flex items-center justify-center relative overflow-hidden"
        >
          <div
            class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#25d466] via-transparent to-transparent"
          ></div>
          <div
            class="w-64 h-64 bg-center bg-no-repeat bg-cover rounded-full z-10"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAz2WZBRUXrGiKI0VDRHa8jrNU3IXaGnVjCsVO1xP6klO4M4zm8g_ZI0IRpjsC-voY2ZZp7YYU_jyNsrzeRZkqy-L9F8N3DXkxq_rNIRDPoP0xu5EG9KdoLVQhtmhAgrD2v5S6OKPMWJk8SFsLHu-UA4kuqQnZ_Q-rXK_kG5_edaVk5S02W0FK_3JLt3CS7hwmhZ3zHGiEr-G48_GW1nepFfQtlQpL6pHd66cXfcOdK3PG1uDepv7NhvX1fCCb-ylrGtq_4dA2zFcM");'
          ></div>
        </div>
      </div>

      <div class="flex flex-col items-center px-6 pb-8">
        <h1
          class="text-slate-900 dark:text-slate-100 tracking-tight text-[32px] font-bold leading-tight text-center pb-4 pt-8"
        >
          {{ ts.t().welcome }}
        </h1>
        <p
          class="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed text-center max-w-sm"
        >
          {{ ts.t().readOur }}
          <span class="text-[#25d466] cursor-pointer">{{ ts.t().privacyPolicy }}</span>{{ ts.t().tapAgree }}
          <span class="text-[#25d466] cursor-pointer">{{ ts.t().termsOfService }}</span>.
        </p>

        <div
          (click)="ts.toggleLanguage()"
          (keydown.enter)="ts.toggleLanguage()"
          tabindex="0"
          role="button"
          class="mt-8 mb-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[#25d466]/10 text-[#25d466] cursor-pointer hover:bg-[#25d466]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#25d466]"
        >
          <mat-icon class="text-[20px]">language</mat-icon>
          <span class="text-sm font-medium">{{ ts.t().languageName }}</span>
          <mat-icon class="text-[20px]">expand_more</mat-icon>
        </div>

        <div class="w-full max-w-[480px] mt-6">
          <button
            routerLink="/login"
            class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-[#25d466] text-[#122017] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span class="truncate">{{ ts.t().agreeAndContinue }}</span>
          </button>
        </div>
      </div>

      <div class="flex flex-col items-center pb-8 opacity-60">
        <p
          class="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
        >
          {{ ts.t().from }}
        </p>
        <p class="text-sm font-bold tracking-widest text-[#25d466]">
          {{ ts.t().zapStudio }}
        </p>
      </div>
    </div>
  `,
})
export class WelcomeComponent {
  ts = inject(TranslationService);
}
