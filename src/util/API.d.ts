export interface iContent {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: object | null;
  budget?: number;
  created_by?: object[];
  episode_run_time?: number[];
  first_air_date?: string;
  genres: iGenre[];
  homepage: string;
  id: number;
  imdb_id?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: object | null;
  name?: string;
  networks?: object[];
  next_episode_to_air?: object | null;
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country: string[];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  seasons?: object[];
  softcore: boolean;
  spoken_languages: {english_name: string}[];
  status: string;
  tagline: string;
  title?: string;
  type?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface iContentResults {
  // Identification and classification
  id: number;
  adult: boolean;
  softcore: boolean;
  type?: string;
  status: string;

  // Names and text
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  tagline: string;
  overview: string;
  homepage: string;

  // Images and rating
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  video?: boolean;

  // Release and runtime
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];

  // Genres and languages
  genres: iGenre[];
  original_language: string;
  languages?: string[];
  origin_country: string[];
  spoken_languages: { english_name: string }[];

  // Movie details
  belongs_to_collection?: object | null;
  budget?: number;
  revenue?: number;
  imdb_id?: string;

  // TV details
  created_by?: object[];
  in_production?: boolean;
  last_episode_to_air?: object | null;
  next_episode_to_air?: object | null;
  networks?: object[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  seasons?: object[];

  // Production details
  production_companies: object[];
  production_countries: object[];
}



interface iGenre {
    id: number;
    name: string;
  }


// _________________________________________________________________________________

/** A paginated TMDB content-list response (for example, top-rated movies). */
export interface iMultiContent {
  page: number;
  results: iMultiContentResult[];
  total_pages: number;
  total_results: number;
}

export interface iMultiContentResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title?: string;
  name?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  softcore?: boolean;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface iMutliSearchContent extends iMultiContent {
  results: (iMultiContentSearchResult | iMultiPersonSearchResult)[],
};

export interface iMultiContentSearchResult extends iMultiContentResult {
  original_country?: string[];
  media_type?: string
};

export interface iMultiPersonSearchResult {
  adult: boolean,
  gender: number, 
  id: number,
  known_for: iMultiContentSearchResult[],
  media_type: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string
};




export interface iKnownFor extends iMultiContentResult {
  character: string,
  first_credit_air_date: string
}





interface iCast {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}

interface iCrew {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  credit_id: string,
  department: string,
  job: string
}

export interface iActedIn {
  id: number;
  cast: iCast[];
  crew: iCrew[]
}

export interface iPerson {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number; // 0: Not set, 1: Female, 2: Male, 3: Non-binary
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}

interface iPersonPopular {
  page: number,
  results: iPersonPopularResults[],
  total_pages: number,
  total_results: number
}
interface iPersonPopularResults {
  adult: boolean,
  gender: number,
  id: number,
  known_for: iMultiContentResult[],
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
};

export const MONTHS:string[];

export const movies: iMultiContent;
export const moviesGenre: {genres: {id:number, name:string}[]};
export const tvShows: iMultiContent;
export const trending: iMultiContent;
export const moviesTopRated: iMultiContent;
export const personsPopular: iPersonPopular;
export const tvShows: iMultiContent;
export const trending: iMultiContent;
export const moviesTopRated: iMultiContent;


export const fetchCastAndCrew: (isMovie: boolean, id: number) => Promise<iActedIn>;
export const fetchSimilarContent: (isMovie: boolean, id: number) => Promise<iMultiContent>;
export const castAndCrewUrl: (contentId: number) => string;
export let showImage: (posterPath: string) => string;
export const movieById: (id: number) => Promise<iContent>;
export const tvById: (id: number) => Promise<iContent>;
export const personById: (personId: number) => Promise<iPerson>; 
export const moviesWorksURL: (personId: number) => Promise<iKnownFor[]>;
export const tvWorksURL: (personId: number) => Promise<iKnownFor[]>;
export function getMovieGenres(ids: number[]): string[];
export const search: (pageNumber: string | null, searchQuery: string | null) => Promise<any>