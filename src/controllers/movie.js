import Card from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {render, RenderPosition} from "../utils/render.js";
import {append} from "../utils/appendChild.js";
import {removeElement} from "../utils/removeChild.js";


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

  }

  render(filmCard) {

    this._filmCardComponent = new Card(filmCard);
    this._filmDetailsComponent = new FilmDetails(filmCard);

    this._filmCardComponent.setClickHandler(() => {
      this._appendFilmToDetail();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }, `.film-card__poster`);

    this._filmCardComponent.setClickHandler(() => {
      this._appendFilmToDetail();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }, `.film-card__title`);

    this._filmCardComponent.setClickHandler(() => {
      this._appendFilmToDetail();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }, `.film-card__comments`);

    this._filmCardComponent.setAddToWatchlistClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatchlist: !filmCard.isWatchlist,
      }));
    });

    this._filmCardComponent.setMarkAsWatchedClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatched: !filmCard.isWatched,
      }));
    });

    this._filmCardComponent.setAddToFavoriteClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isFavorites: !filmCard.isFavorites,
      }));

    });


    this._filmDetailsComponent.setCloseButtonClickHandler((evt) => {
      evt.preventDefault();
      this._appendDetailToFilmCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });


    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatchlist: !filmCard.isWatchlist,
      }));

    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatched: !filmCard.isWatched,
      }));
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isFavorites: !filmCard.isFavorites,
      }));
    });


    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _appendFilmToDetail() {
    append(document.querySelector(`body`), this._filmDetailsComponent);
  }

  _appendDetailToFilmCard() {
    removeElement(document.querySelector(`body`), this._filmDetailsComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._appendDetailToFilmCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

}
