import ButtonShowMore from './components/button-show-more.js';
import FilmsContainer from './components/container.js';
import Card from './components/film-card.js';
import FilmDetails from './components/film-details.js';
import MovieStaistic from "./components/footer-statistic.js";
import Filter from './components/navigation.js';
import Profile from './components/profile.js';
import Sort from './components/sorting';
import {generateFilters} from './mock/filter';
import {generateCards} from "./mock/card.js";
import {profileInformations} from "./mock/profile-rating.js";
import {render, remove, RenderPosition} from "./utils/render.js";
import {append} from "./utils/appendChild.js";
import NoFilmsComponent from "./components/no-films.js";


const FILM_CARD_COUNT = 25;
const FILM_TOP_COUNT = 2;
const FILM_MOST_COMMENTED_COUNT = 2;
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;


const renderFilmCard = (filmCard, place) => {
  const bodyContainer = document.querySelector(`body`);

  const appendFilmToDetail = () => {
    append(bodyContainer, filmDetailsComponent);
  };

  const appendDetailToFilmCard = () => {
    bodyContainer.removeChild(filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      appendDetailToFilmCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmCardComponent = new Card(filmCard);
  const filmDetailsComponent = new FilmDetails(filmCard);

  const onElementClick = (appendElement) => {
    appendElement();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  filmTitle.addEventListener(`click`, () => {
    onElementClick(appendFilmToDetail);
  });

  const filmPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  filmPoster.addEventListener(`click`, () => {
    onElementClick(appendFilmToDetail);
  });

  const filmComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  filmComments.addEventListener(`click`, () => {
    onElementClick(appendFilmToDetail);
  });

  const editForm = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  editForm.addEventListener(`click`, appendDetailToFilmCard);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    onElementClick(appendDetailToFilmCard);
  });


  render(place, filmCardComponent, RenderPosition.BEFOREEND);
};


const renderBoard = (mainContainer, filmCards) => {
  const isAllTasksArchived = filmCards.every((film) => film.isArchive);

  if (isAllTasksArchived) {
    render(mainContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(mainContainer, new FilmsContainer(), RenderPosition.BEFOREEND);

  const filmsContainer = mainContainer.querySelector(`.films`);
  const filmCardElement = filmsContainer.children[0].querySelector(`.films-list__container`);
  const filmsCardTop = filmsContainer.children[1].querySelector(`.films-list__container`);
  const filmsCardMost = filmsContainer.children[2].querySelector(`.films-list__container`);
  const buttonShowMore = mainContainer.querySelector(`.films-list`);

  let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

  const filmTopCards = filmCards.slice().sort((prev, next) => next.filmRating - prev.filmRating);
  const filmMostCommentedCards = filmCards.slice().sort((prev, next) => next.comment.length - prev.comment.length);

  filmCards.slice(0, showingFilmCount)
    .forEach((task) => {
      renderFilmCard(task, filmCardElement);
    });

  filmTopCards.slice(0, FILM_TOP_COUNT)
    .forEach((task) => {
      renderFilmCard(task, filmsCardTop);
    });

  filmMostCommentedCards.slice(0, FILM_MOST_COMMENTED_COUNT)
    .forEach((task) => {
      renderFilmCard(task, filmsCardMost);
    });

  const loadMoreButtonComponent = new ButtonShowMore();
  render(buttonShowMore, loadMoreButtonComponent, RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingFilmCount;
    showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

    filmCards.slice(prevTasksCount, showingFilmCount)
      .forEach((task) => renderFilmCard(task, filmCardElement));
    if (showingFilmCount >= filmCards.length) {
      remove(loadMoreButtonComponent);

    }
  });
};


const filmsStaisticContainer = document.querySelector(`.footer__statistics`);
const siteHeaderElement = document.querySelector(`.header`);
const mainContainer = document.querySelector(`.main`);
const filmCards = generateCards(FILM_CARD_COUNT);
const filters = generateFilters();

render(filmsStaisticContainer, new MovieStaistic(filmCards), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Profile(profileInformations), RenderPosition.BEFOREEND);
render(mainContainer, new Filter(filters), RenderPosition.BEFOREEND);
render(mainContainer, new Sort(), RenderPosition.BEFOREEND);
renderBoard(mainContainer, filmCards);
