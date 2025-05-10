import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'card-movie',
  templateUrl: './card-movie.component.html',
})
export class CardMovieComponent {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() id!: number;
  @Input() isFavorite: boolean = false;

  @Output() favoriteAdded = new EventEmitter<number>();
  @Output() favoriteRemoved = new EventEmitter<number>();

  constructor(
    private favoriteService: FavoritesService,
    private toastr: ToastrService
  ) {}

  addToFavorite(id: number): void {
    this.favoriteService.addToFavorites(id).subscribe(
      (response) => {
        this.favoriteAdded.emit(id);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  removeFromFavorite(id: number): void {
    this.favoriteService.removeFromFavorites(id).subscribe(
      (response) => {
        this.favoriteRemoved.emit(id);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
