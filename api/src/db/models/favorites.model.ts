// Libs
import mongoose from "mongoose";
// Models
import { dateCommonSchema } from './date.common';

const movieSchema = new mongoose.Schema(
    {
        adult: { type: Boolean, default: false },
        backdrop_path: { type: String, default: '' },
        belongs_to_collection: { 
            type: {
                id: { type: Number, default: 0 },
                name: { type: String, default: '' },
                poster_path: { type: String, default: '' },
                backdrop_path: { type: String, default: '' },
            },
            default: {},
        },
        budget: { type: Number, default: 0 },
        genres: {
            type: [
                {
                    id: { type: Number },
                    name: { type: String },
                }
            ],
            default: [],
        },
        homepage: { type: String, default: '' },
        id: { type: Number, required: true, index: true },
        imdb_id: { type: String, default: '' },
        origin_country: { type: [String], default: [] },
        original_language: { type: String, default: '' },
        original_title: { type: String, default: '' },
        overview: { type: String, default: '' },
        popularity: { type: Number, default: 0 },
        poster_path: { type: String, default: '' },
        production_companies: {
            type: [
                {
                    id: { type: Number },
                    logo_path: { type: String, default: '' },
                    name: { type: String, default: '' },
                    origin_country: { type: String, default: '' },
                }
            ],
            default: [],
        },
        production_countries: {
            type: [
                {
                    iso_3166_1: { type: String },
                    name: { type: String },
                }
            ],
            default: [],
        },
        release_date: { type: String },
        revenue: { type: Number, default: 0 },
        runtime: { type: Number, default: 0 },
        spoken_languages: {
            type: [
                {
                    english_name: { type: String, default: '' },
                    iso_639_1: { type: String, default: '' },
                    name: { type: String, default: '' },
                }
            ],
            default: [],
        },
        status: { type: String, default: '' },
        tagline: { type: String, default: '' },
        title: { type: String, required: true },
        video: { type: Boolean, default: false },
        vote_average: { type: Number, default: 0 },
        vote_count: { type: Number, default: 0 },
        favorite: { type: Boolean, default: true },
    },
    { _id: false }
);

const favoritesSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        user: { type: String, required: true, index: true },
        movies: {
            type: [movieSchema],
            default: [],
            required: false,
            comment: 'Favorite movies'
        },
        ...dateCommonSchema,
    },
    {
        versionKey: false,
    }
);

export const Favorites = mongoose.model('favorites', favoritesSchema, 'favorites');