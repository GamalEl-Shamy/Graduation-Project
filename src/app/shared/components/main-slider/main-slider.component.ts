import { Component, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule ],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      // 400: {
      //   items: 2
      // },
      // 740: {
      //   items: 3
      // },
      // 940: {
      //   items: 4
      // }
    },
    nav: false
  }
  slidesStore = signal<any[]>([
    { id: 'slide-1', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1' },
    { id: 'slide-2', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2' },
    { id: 'slide-3', text: 'Slide 3 HM', dataMerge: 3, width: 500, dotContent: 'text3' },
    { id: 'slide-4', text: 'Slide 4 HM', width: 450, dotContent: 'text4' },
    { id: 'slide-5', text: 'Slide 5 HM', dataMerge: 2, width: 500, dotContent: 'text5' },
    { id: 'slide-6', text: 'Slide 6', width: 500, dotContent: 'text5' },
    { id: 'slide-7', text: 'Slide 7', width: 500, dotContent: 'text6' },
    { id: 'slide-8', text: 'Slide 8', width: 500, dotContent: 'text8' },
    // { id: 'slide-7', text: 'Slide 7', dotContent: 'text5'},
    // { id: 'slide-8', text: 'Slide 8', dotContent: 'text5'},
    // { id: 'slide-9', text: 'Slide 9', dotContent: 'text5'},
    // { id: 'slide-10', text: 'Slide 10', dotContent: 'text5'},
  ]);

}
