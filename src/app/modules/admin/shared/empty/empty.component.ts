import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css',
})
export class EmptyComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  icon = input.required<string>();
  goto = input<string>();
  showButton = input<boolean>(true);
}
