import {filmCardTemplate} from './components/film-card.js';
import {filmDetailsTemplate} from './components/film-details.js';
import {buttonShowMoreTemplate} from './components/button-show-more.js';
import {filmsContainerTemplate} from './components/container.js';
import {createFilterTemplate} from './components/navigation.js';
import {headerProfileTemplate} from './components/profile.js';
import {createSortingTemplate} from './components/sorting';
import {generateFilters} from './mock/filter';
import {generateCards} from "./mock/card.js";
import {profileInformations} from "./mock/profile-rating.js";
import {createFilmStaisticTemplate} from "./components/footer-statistic.js";
import {createfilmDetailRows} from "./mock/film-details.js";
import {generateDetailRows} from "./mock/film-details.js";


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


const filters = generateFilters();
const filmCards = generateCards(FILM_CARD_COUNT);
const filmTopCards = filmCards.slice().sort((prev, next) => next.filmRating - prev.filmRating);
const filmMostCommentedCards = filmCards.slice().sort((prev, next) => next.comment.length - prev.comment.length);
const filmDetailRows = createfilmDetailRows(filmCards[0]);
const detailRows = generateDetailRows(filmDetailRows);

const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
render(siteHeaderElement, headerProfileTemplate(profileInformations));
render(mainContainer, createFilterTemplate(filters));
render(mainContainer, createSortingTemplate());
render(mainContainer, filmsContainerTemplate());


const filmsContainer = mainContainer.querySelector(`.films`);
const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const filmCardElement = filmsContainer.children[0].querySelector(`.films-list__container`);
const buttonShowMore = mainContainer.querySelector(`.films-list`);
const filmsCardTop = filmsContainer.children[1].querySelector(`.films-list__container`);
const filmsCardMost = filmsContainer.children[2].querySelector(`.films-list__container`);

const bodyContainer = document.querySelector(`body`);
render(buttonShowMore, buttonShowMoreTemplate());
render(filmsStaisticContainer, createFilmStaisticTemplate(filmCards));


let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

const startCards = filmCards.slice(0, showingFilmCount);
render(filmCardElement, filmCardTemplate, `beforeend`, startCards.length, startCards);

render(filmsCardTop, filmCardTemplate, `beforeend`, FILM_TOP_COUNT, filmTopCards);

render(filmsCardMost, filmCardTemplate, `beforeend`, FILM_MOST_COMMENTED_COUNT, filmMostCommentedCards);

const loadMoreButton = buttonShowMore.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmCount;
  showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;
  let byButtonCards = filmCards.slice(prevTasksCount, showingFilmCount);
  render(filmCardElement, filmCardTemplate, `beforeend`, byButtonCards.length, byButtonCards);

  if (showingFilmCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

render(bodyContainer, filmDetailsTemplate(filmCards[0], detailRows));
