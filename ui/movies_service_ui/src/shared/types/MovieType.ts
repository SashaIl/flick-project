export interface MovieRatingType {
  VoteAverage: number;
  VoteCount: number;
}

export interface MovieDetailsType {
  OriginalTitle: string;
  OriginalLanguage: string;

  ProductionCountries: string[];

  IsReleased: boolean;

  Trailer: string;

  Revenue: number;
  Runtime: number;

  Director: string;
  Writers: string[];
  Actors: string[];
}

export type MovieType = {
  Id: number;
  Favorited?: boolean;
  Title: string;
  ReleaseDate: Date | null;
  Poster: string;
  Genres: MovieGenre[];
  Overview?: string;
  Ratings?: MovieRatingType;
  Details?: MovieDetailsType;
}

export type MovieGenre = {
  GenreId: number,
  Name: string; 
}