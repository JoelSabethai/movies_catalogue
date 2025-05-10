export interface IMoviesResponse {
    page: number;
    results: IMoviesResults[];
    total_pages: number;
    total_results: number;
}

export interface IMoviesResults {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    favorite: boolean;
}

// Interfaces to get movie details
export interface IMovieResponse {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number;
    genres: IGenres[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProductionCompanies[];
    production_countries: IProductionCountries[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguages[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    favorite: boolean;
}

export interface IGenres {
    id: number;
    name: string;
}

interface IProductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface IProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface ISpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

// Interfaces to get configuration details
export interface IConfigurationDetailsResponse {
    images: IImages;
    change_keys: string[];
}

export interface IImages {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
}