import { Component, input } from '@angular/core';
import { Review } from '../../../models/product-details.interface';
import { DatePipe } from '@angular/common';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-reviews',
  imports: [DatePipe, SlideIn],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  reviewInfo = input.required<Review>();
}
