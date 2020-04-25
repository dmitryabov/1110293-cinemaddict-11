import MovieStaistic from "./components/footer-statistic.js";
import Filter from './components/navigation.js';
import Profile from './components/profile.js';
import Sort from './components/sorting';
import {generateFilters} from './mock/filter';
import {generateCards} from "./mock/card.js";
import {profileInformations} from "./mock/profile-rating.js";
import {render, RenderPosition} from "./utils/render.js";
import PageController from "./controllers/page.js";


const FILM_CARD_COUNT = 25;


const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const filmCards = generateCards(FILM_CARD_COUNT);
const filters = generateFilters();

render(filmsStaisticContainer, new MovieStaistic(filmCards), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Profile(profileInformations), RenderPosition.BEFOREEND);
render(mainContainer, new Filter(filters), RenderPosition.BEFOREEND);
render(mainContainer, new Sort(), RenderPosition.BEFOREEND);

const boardController = new PageController(mainContainer);
boardController.render(filmCards);

