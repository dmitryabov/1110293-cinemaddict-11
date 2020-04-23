import {append} from "../utils/appendChild.js";
import {removeElement} from "../utils/removeChild.js";
import NoFilmsComponent from "../components/no-films.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import ButtonShowMore from '../components/button-show-more.js';
import FilmsContainer from '../components/container.js';
import Card from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';


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
    removeElement(bodyContainer, filmDetailsComponent);
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


  filmCardComponent.setClickHandler(() => {
    onElementClick(appendFilmToDetail);
  });


  filmDetailsComponent.setClickHandler(appendDetailToFilmCard);

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

  loadMoreButtonComponent.setClickHandler(() => {
    const prevTasksCount = showingFilmCount;
    showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

    filmCards.slice(prevTasksCount, showingFilmCount)
      .forEach((task) => renderFilmCard(task, filmCardElement));
    if (showingFilmCount >= filmCards.length) {
      remove(loadMoreButtonComponent);

    }
  });
};

export default class PageController {
  constructor(container) {

    this._container = container;
  }

  render(filmCards) {
    const container = this._container;
    renderBoard(container, filmCards);
  }
}
