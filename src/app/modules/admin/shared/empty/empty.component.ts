import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-empty',
  imports: [TitleCasePipe, RouterLink, SlideIn],
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
