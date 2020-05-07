import Card from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {render, replace} from "../utils/render.js";
import {append} from "../utils/appendChild.js";
import {removeElement} from "../utils/removeChild.js";
import {remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

  }

  render(filmCard) {
    this._filmCard = filmCard;

    const oldFilmComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;


    this._filmCardComponent = new Card(filmCard);
    this._filmDetailsComponent = new FilmDetails(filmCard);

    this._filmCardComponent.setClickHandler(() => {
      this._appendFilmToDetail();
    }, `.film-card__poster`);

    this._filmCardComponent.setClickHandler(() => {
      this._appendFilmToDetail();
    }, `.film-card__title`);

    this._filmCardComponent.setClickHandler(() => {
      this._appendFilmToDetail();
    }, `.film-card__comments`);


    this._filmCardComponent.setAddToWatchlistClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmCard, Object.assign({}, this._filmCard, {
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


    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }

  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._appendDetailToFilmCard();
    }
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _appendFilmToDetail() {
    this._onViewChange();
    append(document.querySelector(`body`), this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.OPEN;
  }


  _appendDetailToFilmCard() {
    removeElement(document.querySelector(`body`), this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }


  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._appendDetailToFilmCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

}
