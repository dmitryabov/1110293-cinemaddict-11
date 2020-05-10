import MovieStaistic from "./components/footer-statistic.js";
import Profile from './components/profile.js';
import {generateCards} from "./mock/card.js";
import {profileInformations} from "./mock/profile-rating.js";
import {render, RenderPosition} from "./utils/render.js";
import PageController from "./controllers/page.js";
import Movies from "./moment/movies.js";
import FilterController from "./controllers/filter.js";
import Statistics from "./components/statistics.js";


const FILM_CARD_COUNT = 25;


const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const filmCards = generateCards(FILM_CARD_COUNT);
const filmsModel = new Movies();
filmsModel.setMovies(filmCards);


render(filmsStaisticContainer, new MovieStaistic(filmCards), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Profile(profileInformations), RenderPosition.BEFOREEND);

const filterController = new FilterController(mainContainer, filmsModel);
filterController.render();

const pageController = new PageController(mainContainer, filmsModel);
pageController.render(filmCards);


const statisticsComponent = new Statistics();

render(mainContainer, statisticsComponent, RenderPosition.BEFOREEND);
// statisticsComponent.hide();

