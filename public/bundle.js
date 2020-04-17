/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/button-show-more.js":
/*!********************************************!*\
  !*** ./src/components/button-show-more.js ***!
  \********************************************/
/*! exports provided: buttonShowMoreTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buttonShowMoreTemplate", function() { return buttonShowMoreTemplate; });
const buttonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


/***/ }),

/***/ "./src/components/container.js":
/*!*************************************!*\
  !*** ./src/components/container.js ***!
  \*************************************/
/*! exports provided: filmsContainerTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filmsContainerTemplate", function() { return filmsContainerTemplate; });

const filmsContainerTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">

      </div>

    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">

      </div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">

      </div>
    </section>
  </section>`
  );
};


/***/ }),

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: filmCardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filmCardTemplate", function() { return filmCardTemplate; });
const filmCardTemplate = (card) => {
  const {filmTitle, poster, filmDescription, filmRating,
    releaseDate, runtime, genres} = card;


  return (
    `<article class="film-card">
    <h3 class="film-card__title">${filmTitle}</h3>
    <p class="film-card__rating">${filmRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmDescription}</p>
    <a class="film-card__comments">${card.comment.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};


/***/ }),

/***/ "./src/components/film-details.js":
/*!****************************************!*\
  !*** ./src/components/film-details.js ***!
  \****************************************/
/*! exports provided: filmDetailsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filmDetailsTemplate", function() { return filmDetailsTemplate; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



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


const filmDetailsTemplate = (card, detailRows) => {
  const {filmTitle, poster, filmDescription, filmRating, filmTtitleOriginal, ageRating, comment} = card;
  const filmDetails = createFilmDetailsTemplate(detailRows);
  const filmControls = createFilmControlTemplate(_const_js__WEBPACK_IMPORTED_MODULE_0__["CONTROL_NAMES"]);
  const emojis = createEmojiTemplate(_const_js__WEBPACK_IMPORTED_MODULE_0__["EMOJI_NAMES"]);
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


/***/ }),

/***/ "./src/components/footer-statistic.js":
/*!********************************************!*\
  !*** ./src/components/footer-statistic.js ***!
  \********************************************/
/*! exports provided: createFilmStaisticTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmStaisticTemplate", function() { return createFilmStaisticTemplate; });
const createFilmStaisticTemplate = (cards) => {
  return (`<p>${cards.length} movies inside</p>`);
};


/***/ }),

/***/ "./src/components/navigation.js":
/*!**************************************!*\
  !*** ./src/components/navigation.js ***!
  \**************************************/
/*! exports provided: createFilterTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilterTemplate", function() { return createFilterTemplate; });
const createFilterMarkup = (name, count) => {
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it.name, it.count)).join(`\n`);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: headerProfileTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerProfileTemplate", function() { return headerProfileTemplate; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const getRating = (profileInformation) => {
  let ratingProfile = profileInformation.rating;
  ratingProfile = ratingProfile >= 21 ? `movie buff` : _const_js__WEBPACK_IMPORTED_MODULE_0__["PROFILE_RATINGS"][Math.ceil(ratingProfile / 10)];
  return {
    rating: ratingProfile,
    avatar: `bitmap@2x.png`
  };

};


const headerProfileTemplate = (profile) => {
  const profileInformation = getRating(profile);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileInformation.rating}</p>
      <img class="profile__avatar" src="images/${profileInformation.avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};


/***/ }),

/***/ "./src/components/sorting.js":
/*!***********************************!*\
  !*** ./src/components/sorting.js ***!
  \***********************************/
/*! exports provided: createSortingTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortingTemplate", function() { return createSortingTemplate; });
const createSortingTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;
};


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: CONTROL_NAMES, EMOJI_NAMES, PROFILE_RATINGS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTROL_NAMES", function() { return CONTROL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMOJI_NAMES", function() { return EMOJI_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_RATINGS", function() { return PROFILE_RATINGS; });
const CONTROL_NAMES = [
  {
    name: `watchlist`,
    label: `Add to watchlist`
  },
  {
    name: `watched`,
    label: `Already watched`
  },
  {
    name: `favorite`,
    label: `Add to favorites`
  },

];


const EMOJI_NAMES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const PROFILE_RATINGS = [
  ``,
  `novice`,
  `fan`,
];




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_film_card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/film-card.js */ "./src/components/film-card.js");
/* harmony import */ var _components_film_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/film-details.js */ "./src/components/film-details.js");
/* harmony import */ var _components_button_show_more_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/button-show-more.js */ "./src/components/button-show-more.js");
/* harmony import */ var _components_container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/container.js */ "./src/components/container.js");
/* harmony import */ var _components_navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/navigation.js */ "./src/components/navigation.js");
/* harmony import */ var _components_profile_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/profile.js */ "./src/components/profile.js");
/* harmony import */ var _components_sorting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/sorting */ "./src/components/sorting.js");
/* harmony import */ var _mock_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/filter */ "./src/mock/filter.js");
/* harmony import */ var _mock_card_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/card.js */ "./src/mock/card.js");
/* harmony import */ var _mock_profile_rating_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/profile-rating.js */ "./src/mock/profile-rating.js");
/* harmony import */ var _components_footer_statistic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/footer-statistic.js */ "./src/components/footer-statistic.js");
/* harmony import */ var _mock_film_details_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mock/film-details.js */ "./src/mock/film-details.js");















const FILM_CARD_COUNT = 25;
const FILM_TOP_COUNT = 2;
const FILM_MOST_COMMENTED_COUNT = 2;
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;


const render = (container, template, place = `beforeend`, count = 1, cards) => {
  if (!cards) {
    container.insertAdjacentHTML(place, template);
  } else {
    for (let i = 0; i < count; i++) {
      container.insertAdjacentHTML(place, template(cards[i]));
    }
  }
};


const filters = Object(_mock_filter__WEBPACK_IMPORTED_MODULE_7__["generateFilters"])();
const filmCards = Object(_mock_card_js__WEBPACK_IMPORTED_MODULE_8__["generateCards"])(FILM_CARD_COUNT);
const filmTopCards = filmCards.slice().sort((prev, next) => next.filmRating - prev.filmRating);
const filmMostCommentedCards = filmCards.slice().sort((prev, next) => next.comment.length - prev.comment.length);
const filmDetailRows = Object(_mock_film_details_js__WEBPACK_IMPORTED_MODULE_11__["createfilmDetailRows"])(filmCards[0]);
const detailRows = Object(_mock_film_details_js__WEBPACK_IMPORTED_MODULE_11__["generateDetailRows"])(filmDetailRows);

const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
render(siteHeaderElement, Object(_components_profile_js__WEBPACK_IMPORTED_MODULE_5__["headerProfileTemplate"])(_mock_profile_rating_js__WEBPACK_IMPORTED_MODULE_9__["profileInformations"]));
render(mainContainer, Object(_components_navigation_js__WEBPACK_IMPORTED_MODULE_4__["createFilterTemplate"])(filters));
render(mainContainer, Object(_components_sorting__WEBPACK_IMPORTED_MODULE_6__["createSortingTemplate"])());
render(mainContainer, Object(_components_container_js__WEBPACK_IMPORTED_MODULE_3__["filmsContainerTemplate"])());


const filmsContainer = mainContainer.querySelector(`.films`);
const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const filmCardElement = filmsContainer.children[0].querySelector(`.films-list__container`);
const buttonShowMore = mainContainer.querySelector(`.films-list`);
const filmsCardTop = filmsContainer.children[1].querySelector(`.films-list__container`);
const filmsCardMost = filmsContainer.children[2].querySelector(`.films-list__container`);

const bodyContainer = document.querySelector(`body`);
render(buttonShowMore, Object(_components_button_show_more_js__WEBPACK_IMPORTED_MODULE_2__["buttonShowMoreTemplate"])());
render(filmsStaisticContainer, Object(_components_footer_statistic_js__WEBPACK_IMPORTED_MODULE_10__["createFilmStaisticTemplate"])(filmCards));


let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

const startCards = filmCards.slice(0, showingFilmCount);
render(filmCardElement, _components_film_card_js__WEBPACK_IMPORTED_MODULE_0__["filmCardTemplate"], `beforeend`, startCards.length, startCards);

render(filmsCardTop, _components_film_card_js__WEBPACK_IMPORTED_MODULE_0__["filmCardTemplate"], `beforeend`, FILM_TOP_COUNT, filmTopCards);

render(filmsCardMost, _components_film_card_js__WEBPACK_IMPORTED_MODULE_0__["filmCardTemplate"], `beforeend`, FILM_MOST_COMMENTED_COUNT, filmMostCommentedCards);

const loadMoreButton = buttonShowMore.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmCount;
  showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;
  let byButtonCards = filmCards.slice(prevTasksCount, showingFilmCount);
  render(filmCardElement, _components_film_card_js__WEBPACK_IMPORTED_MODULE_0__["filmCardTemplate"], `beforeend`, byButtonCards.length, byButtonCards);

  if (showingFilmCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

render(bodyContainer, Object(_components_film_details_js__WEBPACK_IMPORTED_MODULE_1__["filmDetailsTemplate"])(filmCards[0], detailRows));


/***/ }),

/***/ "./src/mock/card.js":
/*!**************************!*\
  !*** ./src/mock/card.js ***!
  \**************************/
/*! exports provided: generateCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCards", function() { return generateCards; });
const directors = [`Guns Akimbo`, `Anthony Mann`, `Martians Momar`, `Richard Jewell`];

const writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];

const actors = [`Erich von Stroheim`, `Dan Duryea`, `Erich von Stroheim`, `MaryHughes`, `Dan Duryea`];

const countries = [`USA`, `USSR`, `Kanada`, `Dath`, `Italy`, `Russia`];

const filmTitles = [`Guns Akimbo`, `Bombshell`, `Swallow`, `The Song of Names`, `Richard Jewell`];

const filmPosters = [
  `made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const filmDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const genres = [`Comedy`, `Drama`, `Mystery`, `Cartoon`, `Western`];

const filmTtitleOriginals = [`Guns Akimbo`, `Bombshell`, `Swallow`, `The Song of Names`, `Richard Jewell`];

const ageRatings = [`6+`, `12+`, `0+`, `18+`];

const emojis = [`smile`, `sleeping`, `puke`, `angry`];

const commentText = [`Interesting setting and cast`, `Boooooooring`, `Very old. Meh`, `Almost two hours? Seriously?`];

const authors = [`Jon`, `Ban`, `Mickle`, `Andry`];

const commentDays = [`2019/02/31 03:519`, `2019/01/01 44:59`, `2011/14/41 23:59`, `2019/11/11 13:29`];

const releaseDates = [`11 June 1905`, `30 May 1911`, `12 April 1988`, `01 April 1995`];


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


const generateComments = (numberOfComments) => {
  const comments = [];
  for (let i = 0; i < numberOfComments; i++) {
    const filmComments = {
      emoji: getRandomArrayItem(emojis),
      text: getRandomArrayItem(commentText),
      author: getRandomArrayItem(authors),
      commentDay: getRandomArrayItem(commentDays)
    };
    comments.push(filmComments);
  }
  return comments;
};


const generateCard = () => {
  return {
    director: getRandomArrayItem(directors),
    writer: getRandomArrayItem(writers),
    actor: actors.slice(getRandomIntegerNumber(0, actors.length)).join(`, `),
    releaseDate: getRandomArrayItem(releaseDates),
    runtime: `1h ${getRandomIntegerNumber(1, 60)}m`,
    country: countries.slice(getRandomIntegerNumber(0, actors.length)).join(`, `),
    genres: genres.slice(getRandomIntegerNumber(0, countries.length)).join(`, `),
    filmDescription: getRandomArrayItem(filmDescriptions),
    filmTitle: getRandomArrayItem(filmTitles),
    poster: filmPosters[getRandomIntegerNumber(1, 5)],
    comment: generateComments(getRandomIntegerNumber(1, 10)),
    filmRating: getRandomIntegerNumber(1, 10),
    filmTtitleOriginal: getRandomArrayItem(filmTtitleOriginals),
    ageRating: getRandomArrayItem(ageRatings),
  };
};


const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};





/***/ }),

/***/ "./src/mock/film-details.js":
/*!**********************************!*\
  !*** ./src/mock/film-details.js ***!
  \**********************************/
/*! exports provided: createfilmDetailRows, generateDetailRows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createfilmDetailRows", function() { return createfilmDetailRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateDetailRows", function() { return generateDetailRows; });
const createfilmDetailRows = (details) => {
  return [
    {Director: `${details.director}`},
    {Writers: `${details.writer}`},
    {Actors: `${details.actor}`},
    {Release: `${details.releaseDate}`},
    {Runtime: `${details.runtime}`},
    {Country: `${details.country}`},
    {Genres: `${details.genres}`},
  ];
};


const generateDetailRows = (rows) => {
  return rows.map((it) => {
    return {
      term: Object.keys(it),
      cell: Object.values(it)
    };
  });
};





/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: generateFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilters", function() { return generateFilters; });
const filterNames = [
  `Watchlist`, `History`, `Favorites`
];


const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};





/***/ }),

/***/ "./src/mock/profile-rating.js":
/*!************************************!*\
  !*** ./src/mock/profile-rating.js ***!
  \************************************/
/*! exports provided: profileInformations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "profileInformations", function() { return profileInformations; });
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


const profileInformations =
  {
    rating: getRandomIntegerNumber(0, 30),
    avatar: `bitmap@2x.png`
  }
;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map