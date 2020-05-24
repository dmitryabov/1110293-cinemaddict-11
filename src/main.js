import FooterFilmsСountStaistic from "./components/footer-films-count-staistic.js";
import Profile from './components/profile.js';
import {render, RenderPosition} from "./utils/render.js";
import PageController from "./controllers/page.js";
import Movies from "./models/movies.js";
import FilterController from "./controllers/filter.js";
import API from "./api.js";

const AUTHORIZATION = `Basic eo0w59034534534539a`;
const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const api = new API(AUTHORIZATION);
const filmsModel = new Movies();
const pageController = new PageController(mainContainer, filmsModel, api);
const filterController = new FilterController(mainContainer, filmsModel, pageController);
filterController.render();

api.getFilms()
  .then((movies) => {
    filmsModel.setMovies(movies);
    pageController.render(movies);
    render(filmsStaisticContainer, new FooterFilmsСountStaistic(movies), RenderPosition.BEFOREEND);
    render(siteHeaderElement, new Profile(movies.filter((item) => item.isWatched === true)), RenderPosition.BEFOREEND);
  });
