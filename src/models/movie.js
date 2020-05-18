import Comment from "./comment";


export default class Movie {
  constructor(data, comments) {
    this.id = data[`id`];
    this.director = data[`film_info`].director;
    this.writer = data[`film_info`].writers;
    this.comment = comments;
    this.comments = data.comments;
    this.actor = data[`film_info`].actors;
    this.releaseDate = data[`film_info`].release.date;
    this.runtime = data[`film_info`].runtime;
    this.country = data[`film_info`].release.release_country;
    this.genres = data[`film_info`].genre;
    this.filmDescription = data[`film_info`].description;
    this.filmTitle = data[`film_info`].title;
    this.poster = data[`film_info`].poster;
    this.filmRating = data[`film_info`].total_rating;
    this.filmTitleOriginal = data[`film_info`].alternative_title;
    this.ageRating = data[`film_info`].age_rating;
    this.isWatchlist = Boolean(data[`user_details`].watchlist);
    this.isWatched = Boolean(data[`user_details`].already_watched);
    this.isFavorites = Boolean(data[`user_details`].favorite);
    this.watchingDate = data[`user_details`].watching_date;
  }


  static parseFilm(data, comments) {
    return new Movie(data, Comment.parseComments(comments));
  }

  static parseFilms(films, comments) {
    return films.map((film, i) => Movie.parseFilm(film, comments[i]));
  }


  toRaw() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.filmTitle,
        'alternative_title': this.filmTitleOriginal,
        'total_rating': this.filmRating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writer,
        'actors': this.actor,
        'release': {
          'date': this.releaseDate,
          'release_country': this.country
        },
        'runtime': this.runtime,
        'genre': this.genres,
        'description': this.filmDescription,
      },
      'user_details': {
        'watchlist': this.isWatchlist,
        'already_watched': !!this.isWatched,
        'watching_date': this.watchingDate,
        'favorite': this.isFavorites
      }
    };
  }


  static clone(data) {
    return new Movie(data.toRaw());
  }

}
