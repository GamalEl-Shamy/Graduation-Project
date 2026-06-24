import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  isDarkMode = signal<boolean>(true);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const isDark = this.isDarkMode();
        
        if (isDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('zaraaTheme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('zaraaTheme', 'light');
        }
      }
    });

    this.initTheme();
  }

  private initTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('zaraaTheme');
      if (savedTheme === 'light') {
        this.isDarkMode.set(false);
      } else if (savedTheme === 'dark') {
        this.isDarkMode.set(true);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.add('theme-transition');
      this.isDarkMode.update(current => !current);
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 400);
    } else {
      this.isDarkMode.update(current => !current);
    }
  }
}
