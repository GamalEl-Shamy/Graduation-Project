import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-highlights',
  imports: [],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css',
})
export class HighlightsComponent {
  currentImageIndex = 0;
  images: string[] = [
    './images/corn-crop.png',
    './images/orange.png',
    './images/banana.png',
    './images/apple.png',
  ];

  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 2000); 
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get currentImage(): string {
    return this.images[this.currentImageIndex];
  }

}
