import Comment from "./comment";


export default class Movie {
  constructor(data, comments) {
    this.id = data[`id`];
    this.director = data[`film_info`].director;
    this.writer = data[`film_info`].writers;
    this.actor = data[`film_info`].actors;
    this.releaseDate = data[`film_info`].release.date;
    this.runtime = data[`film_info`].runtime;
    this.country = data[`film_info`].release.release_country;
    this.genres = data[`film_info`].genre;
    this.filmDescription = data[`film_info`].description;
    this.filmTitle = data[`film_info`].title;
    this.poster = data[`film_info`].poster;
    this.comment = comments;
    this.filmRating = data[`film_info`].total_rating;
    this.filmTtitleOriginal = data[`film_info`].alternative_title;
    this.ageRating = data[`film_info`].age_rating;
    this.isWatchlist = Boolean(data[`user_details`].watchlist);
    this.isWatched = Boolean(data[`user_details`].already_watched);
    this.isFavorites = Boolean(data[`user_details`].favorite);
  }


  static parseFilm(filmData, comments) {
    return new Movie(filmData, Comment.parseComments(comments));
  }

  static parseFilms(films, comments) {
    return films.map((film, i) => Movie.parseFilm(film, comments[i]));
  }
}
