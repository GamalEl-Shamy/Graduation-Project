import { Component, inject, input, signal } from '@angular/core';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-add-rating',
  imports: [],
  templateUrl: './add-rating.component.html',
  styleUrl: './add-rating.component.css',
})
export class AddRatingComponent {
  productId = input.required<number>();

  private reviewService = inject(ReviewService);


  stars = [1, 2, 3, 4, 5];
  currentRating = signal<number>(0);
  hoveredRating = signal<number>(0);
  isSubmitting = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  submitRating(rating: number) {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.isSubmitting.set(true);
    this.currentRating.set(rating);

    this.reviewService.addRating(this.productId(), rating).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.successMessage.set('Thank you! ' + response.message);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.currentRating.set(0);
        this.errorMessage.set(err.message);
      }
    });
  }
}
