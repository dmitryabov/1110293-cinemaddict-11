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
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
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
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRaw()),
      headers,
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
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  _getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
      .then((response) => response.json());
  }

  createComment(filmId, comment) {
    return this._load({
      url: `https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`,
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


  _load({url, method = `Method`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${url}`, {method, body, headers})
      .then(checkStatus);

  }
}
