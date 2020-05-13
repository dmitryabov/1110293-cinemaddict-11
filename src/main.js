import MovieStaistic from "./components/footer-statistic.js";
import Profile from './components/profile.js';
import {profileInformations} from "./mock/profile-rating.js";
import {render, RenderPosition} from "./utils/render.js";
import PageController from "./controllers/page.js";
import Movies from "./moment/movies.js";
import FilterController from "./controllers/filter.js";
import API from "./api.js";


const AUTHORIZATION = `Basic eo0w59034534534539a`;


const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const api = new API(AUTHORIZATION);
const filmsModel = new Movies();
const filterController = new FilterController(mainContainer, filmsModel);
const pageController = new PageController(mainContainer, filmsModel);


render(siteHeaderElement, new Profile(profileInformations), RenderPosition.BEFOREEND);

filterController.render();


api.getFilms()
  .then((movies) => {
    filmsModel.setMovies(movies);
    pageController.render(movies);
    render(filmsStaisticContainer, new MovieStaistic(movies), RenderPosition.BEFOREEND);
  });
