import AbstractComponent from "./abstract-component.js";
import {formatDate, filmDuration} from "../utils/common.js";

const createFilmCardTemplate = (card) => {
  const {filmTitle, poster, filmDescription, filmRating,
    releaseDate, runtime, genres, isWatchlist, isWatched, isFavorites} = card;

  const watchlistButton = isWatchlist ? `film-card__controls-item--active` : ``;
  const watchedButton = isWatched ? `film-card__controls-item--active` : ``;
  const favoritesButton = isFavorites ? `film-card__controls-item--active` : ``;
  const date = formatDate(releaseDate);
  const time = filmDuration(runtime);
  const description = filmDescription.length > 140 ? filmDescription.substr(0, 140) + `...` : filmDescription;


  return (
    `<article class="film-card">
    <h3 class="film-card__title">${filmTitle}</h3>
    <p class="film-card__rating">${filmRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${time}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${card.comment.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButton}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButton}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoritesButton}">Mark as favorite</button>
    </form>
  </article>`
  );
};
/**
 * @class
 * @param {object} card  объект с данными о фильме
 */
export default class Card extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setClickHandler(handler, selector) {
    this.getElement().querySelector(selector).addEventListener(`click`, handler);
  }

  setAddToWatchlistClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setMarkAsWatchedClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setAddToFavoriteClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
}
