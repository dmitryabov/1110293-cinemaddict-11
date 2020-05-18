import Movie from "./models/movie";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(checkStatus)
      .then((response) => response.json())
      .then((films) => {
        return Promise.all(films.map((it) => this._getComments(it.id)))
          .then((comments) => {
            return Movie.parseFilms(films, comments);
          });
      });
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: `PUT`,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then((film) => {
        return this._getComments(film.id)
          .then((comments) => {
            return Movie.parseFilm(film, comments);
          });
      });

  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }


  createComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: `POST`,
      body: JSON.stringify(comment),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Comment.parseComment);
  }


  deleteComment(commentId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${commentId}`, {
      method: `DELETE`,
      headers,
    })
    .then(checkStatus);
  }


  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  _getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then((response) => response.json());
  }
}
