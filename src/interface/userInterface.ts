export interface Imovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  // genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  name: string;
  original_name: string;
  first_air_date: string;
}
interface Idates {
  maximum: string;
  minimum: string;
}
export interface Imovies {
  page: number;
  results: Imovie[];
  dates: Idates[];
  total_results: number;
  total_pages: number;
}

interface ImovieDetailGenres {
  id: number;
  name: string;
}
interface ImovieDetailProduction {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface ImovieDetailProductionContry {
  iso_3166_1: string;
  name: string;
}
interface ImovieDetailLanguage {
  iso_639_1: string;
  name: string;
}

export interface ImovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: ImovieDetailGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ImovieDetailProduction[];
  production_countries: ImovieDetailProductionContry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ImovieDetailLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ImovieSimilar {
  page: number;
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      release_date: string;
      poster_path: string;
      popularity: number;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }
  ];
  total_pages: 9;
  total_results: 168;
}
interface Ivideo {
  id: string;
  key: string;
  name: string;
}
export interface ImovieVideo {
  id: number;
  results: Ivideo[];
}

interface ItvCompany {
  id: number;
  name: string;
  logo_path: string;
}
interface ItvSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
export interface ItvDetail {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  homepage: string;
  id: number;
  in_production: boolean;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genres: ImovieDetailGenres[];
  production_companies: ItvCompany[];
  seasons: ItvSeason[];
}

interface Ipeoples {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}
export interface Ipeople {
  page: number;
  results: Ipeoples[];
  total_pages: number;
  total_results: number;
}
