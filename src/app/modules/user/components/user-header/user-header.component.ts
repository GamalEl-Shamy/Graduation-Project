import { Component, DOCUMENT, HostListener, inject, input, output, signal } from '@angular/core';
import { ThemeService } from '../../../../shared/services/theme.service';
import { DatePipe } from '@angular/common';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-user-header',
  imports: [DatePipe,RouterLinkWithHref],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent {
  themeService = inject(ThemeService);

  today = new Date();
   char = input.required<string>();
  userFirstName = input.required<string>();
  userRole = input.required<string>();



  toggleSidebarEvent = output<void>();
  closeSidebarEvent = output<void>();

  // دوال يتم استدعاؤها من الـ HTML لعمل Emit (إرسال)
  onToggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  onCloseSidebar() {
    this.closeSidebarEvent.emit();
  }


}
