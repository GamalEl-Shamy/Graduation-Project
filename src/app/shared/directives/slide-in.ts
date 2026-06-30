import { AfterViewInit, computed, Directive, ElementRef, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[appSlideIn]',
  host: {
    '[class]': 'dynamicClasses()'
  }
})
export class SlideIn implements AfterViewInit {

  private el = inject(ElementRef);
  
  direction = input<'left' | 'right' | 'up' | 'down'>('left');
  
  isVisible = signal<boolean>(false);

  dynamicClasses = computed(() => {
    const baseClasses = 'transition-all duration-1000 ease-out transform block';
    
    if (this.isVisible()) {
      return `${baseClasses} opacity-100 translate-x-0 translate-y-0`;
    } else {
      let hiddenClasses = 'opacity-0 ';
      
      switch (this.direction()) {
        case 'left':  hiddenClasses += '-translate-x-32'; break; 
        case 'right': hiddenClasses += 'translate-x-32'; break;  
        case 'up':    hiddenClasses += '-translate-y-32'; break;
        case 'down':  hiddenClasses += 'translate-y-32'; break;
      }
      
      return `${baseClasses} ${hiddenClasses}`;
    }
  });

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          observer.unobserve(this.el.nativeElement); 
        }
      },
      { threshold: 0.15 } 
    );

    observer.observe(this.el.nativeElement);
  }

}
