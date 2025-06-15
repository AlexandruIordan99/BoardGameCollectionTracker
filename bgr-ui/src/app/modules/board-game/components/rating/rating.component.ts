// rating.component.ts
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: false,
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Input() boardGameId: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  maxRating: number = 5;
  hoveredRating: number = 0;

  get fullStars(): number {
    const displayRating = this.hoveredRating > 0 ? this.hoveredRating : this.rating;
    return Math.floor(displayRating);
  }

  get showsHalfStar(): boolean {
    if (this.hoveredRating > 0) return false; // No half stars when hovering
    return this.rating > 0 && this.rating % 1 !== 0;
  }

  get emptyStars(): number {
    const displayRating = this.hoveredRating > 0 ? this.hoveredRating : this.rating;
    return this.maxRating - Math.ceil(displayRating);
  }

  onStarClick(starIndex: number): void {
    if (this.readonly) return;

    const newRating = starIndex + 1;
    this.rating = newRating;
    this.ratingChange.emit(newRating);
  }

  onStarHover(starIndex: number): void {
    if (this.readonly) return;
    this.hoveredRating = starIndex + 1;
  }

  onMouseLeave(): void {
    if (this.readonly) return;
    this.hoveredRating = 0;
  }

  shouldShowFilledStar(starIndex: number): boolean {
    if (this.hoveredRating > 0) {
      return starIndex < this.hoveredRating;
    }
    return starIndex < Math.floor(this.rating);
  }

  shouldShowHalfStar(starIndex: number): boolean {
    if (this.hoveredRating > 0) return false; // No half stars when hovering

    const flooredRating = Math.floor(this.rating);
    return starIndex === flooredRating && this.rating > flooredRating && this.rating < flooredRating + 1;
  }
}
