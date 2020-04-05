import {filmCardTemplate} from './components/film-card.js';
import {filmDetailsTemplate} from './components/film-details.js';
import {mostFilmsListTemplate} from './components/most-films-list.js';
import {topFilmsListTemplate} from './components/films-list.js';
import {buttonShowMoreTemplate} from './components/button-show-more.js';
import {filmsContainerTemplate} from './components/container.js';
import {mainNavigationTemplate} from './components/navigation.js';
import {headerProfileTemplate} from './components/profile.js';


const FILM_CARD_COUNT = 5;
const FILM_TOP_COUNT = 2;
const FILM_MOST_COUNT = 2;


const render = (container, template, count = 1, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};


const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
render(siteHeaderElement, headerProfileTemplate());
render(mainContainer, mainNavigationTemplate());
render(mainContainer, filmsContainerTemplate());


const filmsContainer = mainContainer.querySelector(`.films`);
const filmCardElement = filmsContainer.children[0].querySelector(`.films-list__container`);
const buttonShowMore = mainContainer.querySelector(`.films-list`);
const filmsCardTop = filmsContainer.children[1].querySelector(`.films-list__container`);
const filmsCardMost = filmsContainer.children[2].querySelector(`.films-list__container`);
const bodyContainer = document.querySelector(`body`);


render(filmCardElement, filmCardTemplate(), FILM_CARD_COUNT);
render(buttonShowMore, buttonShowMoreTemplate());
render(filmsCardTop, topFilmsListTemplate(), FILM_TOP_COUNT);
render(filmsCardMost, mostFilmsListTemplate(), FILM_MOST_COUNT);
render(bodyContainer, filmDetailsTemplate());
