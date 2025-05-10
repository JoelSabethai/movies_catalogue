import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IBaseResponse, IBaseSuccessResponse } from 'src/app/core/models/api.model';
import { IFavoritesResponse } from '../models/favorites.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = environment.apiUrl;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private http: HttpClient) {}

  // Method to get all favorite movies
  getFavoriteMovies(page: number, search: string): Observable<IBaseResponse<IFavoritesResponse>> {
    return this.http.get<IBaseResponse<IFavoritesResponse>>(`${this.apiUrl}/favorites`, {
        params: {
            page: page,
            searchQuery: search,
        },
        headers: this.headers,
    });
  }

  // Method to get favorite movie details by ID
  addToFavorites(id: number): Observable<IBaseSuccessResponse> {
    return this.http.post<IBaseSuccessResponse>(`${this.apiUrl}/favorites/${id}`, {}, { headers: this.headers });
  }

  // Method to delete movie from favorites
  removeFromFavorites(id: number): Observable<IBaseSuccessResponse> {
    return this.http.delete<IBaseSuccessResponse>(`${this.apiUrl}/favorites/${id}`, { headers: this.headers });
  }
}
