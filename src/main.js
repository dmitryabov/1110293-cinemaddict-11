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


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const filters = generateFilters();
const filmCards = generateCards(FILM_CARD_COUNT);
const filmTopCards = generateCards(FILM_TOP_COUNT);
const filmMostCommentedCards = generateCards(FILM_MOST_COMMENTED_COUNT);
const filmDetailRows = createfilmDetailRows(filmCards[0]);
const detailRows = generateDetailRows(filmDetailRows);

const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
render(siteHeaderElement, headerProfileTemplate(profileInformations), `beforeend`);
render(mainContainer, createFilterTemplate(filters), `beforeend`);
render(mainContainer, createSortingTemplate(), `beforeend`);
render(mainContainer, filmsContainerTemplate(), `beforeend`);


const filmsContainer = mainContainer.querySelector(`.films`);
const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const filmCardElement = filmsContainer.children[0].querySelector(`.films-list__container`);
const buttonShowMore = mainContainer.querySelector(`.films-list`);
const filmsCardTop = filmsContainer.children[1].querySelector(`.films-list__container`);
const filmsCardMost = filmsContainer.children[2].querySelector(`.films-list__container`);
const bodyContainer = document.querySelector(`body`);


let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

render(buttonShowMore, buttonShowMoreTemplate(), `beforeend`);
render(filmsStaisticContainer, createFilmStaisticTemplate(filmCards), `beforeend`);

filmCards.slice(0, showingFilmCount)
  .forEach((task) => render(filmCardElement, filmCardTemplate(task), `beforeend`));

for (let i = 0; i < filmTopCards.length; i++) {
  render(filmsCardTop, filmCardTemplate(filmCards[i]), `beforeend`);
}

for (let i = 0; i < filmMostCommentedCards.length; i++) {
  render(filmsCardMost, filmCardTemplate(filmMostCommentedCards[i]), `beforeend`);
}


const loadMoreButton = buttonShowMore.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmCount;
  showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

  filmCards.slice(prevTasksCount, showingFilmCount)
  .forEach((task) => render(filmCardElement, filmCardTemplate(task), `beforeend`));

  if (showingFilmCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

render(bodyContainer, filmDetailsTemplate(filmCards[0], detailRows), `beforeend`);
