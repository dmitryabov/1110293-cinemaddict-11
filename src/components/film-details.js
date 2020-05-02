import {EMOJI_NAMES} from '../const.js';
import AbstractSmartComponent from "./abstract-smart-component.js";


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


const createEmojiTemplate = (emojiArrays) => {
  return emojiArrays
    .map((name) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
        <label class="film-details__emoji-label" for="emoji-${name}">
        <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
      </label>`
      );
    })
    .join(`\n`);
};


const createCommentTemplate = (comments) => {
  return comments
  .map((comment) => {
    const {emoji, text, author, commentDay} = comment;
    return (
      `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
           </span>
           <div>
             <p class="film-details__comment-text">${text}</p>
             <p class="film-details__comment-info">
               <span class="film-details__comment-author">${author}</span>
               <span class="film-details__comment-day">${commentDay}</span>
               <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
       </li>`
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
      cell: `${card.releaseDate}`,
      term: `Release`,
    },
    {
      cell: `${card.runtime}`,
      term: `Runtime`,
    },
    {
      cell: `${card.country.join(`, `)}`,
      term: `${card.country.length > 1 ? `Countries` : `Country`}`,
    },
    {
      cell: `${createFilmGenreTemplate(card.genres)}`,
      term: `${card.genres.length > 1 ? `Genres` : `Genre`}`,
    },
  ];
};


const createFilmDetailTemplate = (card) => {
  const {filmTitle, poster, filmDescription, filmRating, filmTtitleOriginal, ageRating, comment, isWatchlist, isWatched, isFavorites} = card;
  const filmDetailRows = createfilmDetailRows(card);
  const filmDetails = createFilmDetailsTemplate(filmDetailRows);
  const emojis = createEmojiTemplate(EMOJI_NAMES);
  const filmComments = createCommentTemplate(comment);
  const watchlistButton = isWatchlist ? `checked` : ``;
  const watchedButton = isWatched ? `checked` : ``;
  const favoritesButton = isFavorites ? `checked` : ``;

  return (
    `<section class="film-details">
       <form class="film-details__inner" action="" method="get">
       <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistButton}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedButton}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoritesButton}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${card.comment.length}</span></h3>
            <ul class="film-details__comments-list">
                ${filmComments}
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                ${emojis}
              </div>
            </div>
          </section>
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
    this._watchlistButtonHandler = null;
    this._watchedButtonHandler = null;
    this._favoritesButtonHandler = null;

    this._subscribeOnEvents();

  }

  getTemplate() {
    return createFilmDetailTemplate(this._card);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  setCloseButtonClickHandler(handler) {
    this._closeButtonHandler = handler;
    this.getElement().querySelector(`.film-details__close`).addEventListener(`click`, handler);
  }


  setWatchlistButtonClickHandler(handler) {
    this._watchlistButtonHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this._watchedButtonHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this._favoritesButtonHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
    this.setCloseButtonClickHandler(this._closeButtonHandler);
    this.setWatchlistButtonClickHandler(this._watchlistButtonHandler);
    this.setWatchedButtonClickHandler(this._watchedButtonHandler);
    this.setFavoritesButtonClickHandler(this._favoritesButtonHandler);

  }

}

