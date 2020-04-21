import {CONTROL_NAMES} from '../const.js';
import {EMOJI_NAMES} from '../const.js';
import {createElement} from '../utils.js';


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


const createFilmControlTemplate = (controls) => {
  return controls
    .map((control) => {
      const {name, label} = control;
      return (
        ` <input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}">
        <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${label}</label>`
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
  const {filmTitle, poster, filmDescription, filmRating, filmTtitleOriginal, ageRating, comment} = card;
  const filmDetailRows = createfilmDetailRows(card);
  const filmDetails = createFilmDetailsTemplate(filmDetailRows);
  const filmControls = createFilmControlTemplate(CONTROL_NAMES);
  const emojis = createEmojiTemplate(EMOJI_NAMES);
  const filmComments = createCommentTemplate(comment);

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
         ${filmControls}
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

export default class FilmDetails {
  constructor(card) {
    this._card = card;

    this._element = null;
  }

  getTemplate() {
    return createFilmDetailTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

