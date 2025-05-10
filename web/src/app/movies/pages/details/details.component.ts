import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MovieService } from '../../services/movies.service';
import { FavoritesService } from '../../services/favorites.service';

import { IImages, IMovieResponse, IGenres } from '../../models/movies.model';

@Component({
  selector: 'details-component',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  configImages!: IImages;

  movieId!: string;
  movie!: IMovieResponse;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoritesService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.movieId = params['movieId'];
    });
  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(): void {
    this.movieService.getConfigurations().subscribe(
      (response) => {
        this.configImages = response.data.images;
        this.getMovieDetails();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (response) => {
        this.movie = response.data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getGenres(genres: IGenres[]): string {
    return genres.map((genre) => genre.name).join(', ');
  }

  addToFavorite(): void {
    this.favoriteService.addToFavorites(Number(this.movieId)).subscribe(
      (response) => {
        this.movie.favorite = true;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  removeFromFavorite(): void {
    this.favoriteService.removeFromFavorites(Number(this.movieId)).subscribe(
      (response) => {
        this.movie.favorite = false;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
