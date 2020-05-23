import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatDate, changeFormatToFilmDuration} from "../utils/common.js";


const createFilmDetailsTemplate = (rows) => {
  return rows
    .map((row) => {
      const {term, cell} = row;
      return (
        `<tr class="film-details__row">
           <td class="film-details__term">${term}</td>
           <td class="film-details__cell">${cell}</td>
         </tr>`
      );
    })
    .join(`\n`);
};


const createFilmGenre = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};


const createFilmGenreTemplate = (genres) => {
  const filmDetailsRow = genres.map((it, i) => createFilmGenre(it, i === 0)).join(`\n`);
  return `${filmDetailsRow}`;
};


const createfilmDetailRows = (card) => {
  const date = formatDate(card.releaseDate);
  const time = changeFormatToFilmDuration(card.runtime);
  return [
    {
      cell: `${card.director}`,
      term: `Director`
    },
    {
      cell: `${card.writer.join(`, `)}`,
      term: `${card.writer.length > 1 ? `Writers` : `Writer`}`,
    },
    {
      cell: `${card.actor.join(`, `)}`,
      term: `${card.actor.length > 1 ? `Actors` : `Actor`}`,
    },
    {
      cell: `${date}`,
      term: `Release`,
    },
    {
      cell: `${time}`,
      term: `Runtime`,
    },
    {
      cell: `${card.country}`,
      term: `Country`,
    },
    {
      cell: `${createFilmGenreTemplate(card.genres)}`,
      term: `${card.genres.length > 1 ? `Genres` : `Genre`}`,
    },
  ];
};

const filmControls = new Map([
  [`watchlist`, `Add to watchlist`],
  [`watched`, `Already watched`],
  [`favorite`, `Add to favorites`]
]);

const createControlsMarkup = (control, isActive = false) => {
  return (
    `<input type="checkbox" ${isActive ? `checked` : ``} class="film-details__control-input visually-hidden" id="${control}" name="${control}">
      <label for="${control}" class="film-details__control-label film-details__control-label--${control}">${filmControls.get(control)}</label>`
  );
};

const createFilmDetailTemplate = (card) => {
  const {filmTitle, poster, filmDescription, filmRating, filmTtitleOriginal, ageRating} = card;
  const filmDetailRows = createfilmDetailRows(card);
  const filmDetails = createFilmDetailsTemplate(filmDetailRows);
  const watchListControl = createControlsMarkup(`watchlist`, card.isWatchlist);
  const watchedControl = createControlsMarkup(`watched`, card.isWatched);
  const favoriteControl = createControlsMarkup(`favorite`, card.isFavorites);


  return (
    `<section class="film-details">
       <form class="film-details__inner" action="" method="get">
       <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">
            <p class="film-details__age">${ageRating}</p>
          </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmTitle}</h3>
              <p class="film-details__title-original">Original: ${filmTtitleOriginal}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmRating}</p>
            </div>
          </div>
          <table class="film-details__table">
             ${filmDetails}
          </table>
          <p class="film-details__film-description">
             ${filmDescription}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        ${watchListControl}
        ${watchedControl}
        ${favoriteControl}
      </section>
        </div>
        <div class="form-details__bottom-container">

        </div>
      </form>
    </section>`
  );
};
/**
 * @class
 * @param {object} card объект с данными о фильме
 */
export default class FilmDetails extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;

    this._submitHandler = null;

  }

  recoveryListeners() {
    this.setClickHandler(this._submitHandler);
    this._subscribeOnEvents();

  }

  getTemplate() {
    return createFilmDetailTemplate(this._card);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._submitHandler = handler;
  }


  removeClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, handler);
  }


  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
  }

}

