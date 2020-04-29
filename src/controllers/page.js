import {append} from "../utils/appendChild.js";
import {removeElement} from "../utils/removeChild.js";
import NoFilmsComponent from "../components/no-films.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import ButtonShowMore from '../components/button-show-more.js';
import FilmsContainer from '../components/container.js';
import FilmsExtraContainer from '../components/films-extra.js';
import Card from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import Filter from '../components/navigation.js';
import Sort, {SortType} from '../components/sorting';
import {generateFilters} from '../mock/filter';
import {FILM_LIST_CATEGORIES} from '../const';


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
  }, `.film-card__poster`);

  filmCardComponent.setClickHandler(() => {
    onElementClick(appendFilmToDetail);
  }, `.film-card__title`);

  filmCardComponent.setClickHandler(() => {
    onElementClick(appendFilmToDetail);
  }, `.film-card__comments`);


  filmDetailsComponent.setClickHandler(appendDetailToFilmCard, `.film-details__close`);

  render(place, filmCardComponent, RenderPosition.BEFOREEND);
};


const renderFilmCards = (filmCards, filmCardElement) => {
  filmCards.forEach((filmCard) => {
    renderFilmCard(filmCard, filmCardElement);
  });
};


const getSortedTasks = (films, sortType, from, to) => {
  let sortedFilmCards = [];
  const showingFilmCards = films.slice();

  switch (sortType) {
    case SortType.SORT_DATE:
      sortedFilmCards = showingFilmCards.sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate));
      break;
    case SortType.SORT_RATING:
      sortedFilmCards = showingFilmCards.sort((a, b) => b.filmRating - a.filmRating);
      break;
    case SortType.DEFAULT:
      sortedFilmCards = showingFilmCards;
      break;
  }

  return sortedFilmCards.slice(from, to);
};

/**
 * @class
 * @param {Element} container селектор на DOM элемент
 */
export default class PageController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsContainer = new FilmsContainer();
    this._filmsCommentContainer = new FilmsExtraContainer(FILM_LIST_CATEGORIES.COMMENT);
    this._filmsExtraContainer = new FilmsExtraContainer(FILM_LIST_CATEGORIES.RATE);
    this._buttonShowMore = new ButtonShowMore();
  }

  render(filmCards) {
    const renderLoadMoreButton = () => {
      if (showingFilmCount >= filmCards.length) {
        return;
      }
      render(buttonShowMore, this._buttonShowMore, RenderPosition.BEFOREEND);
      this._buttonShowMore.setClickHandler(() => {
        const prevFilmCardCount = showingFilmCount;
        showingFilmCount = showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

        const sortedFilmCards = getSortedTasks(filmCards, this._sort.getSortType(), prevFilmCardCount, showingFilmCount);

        renderFilmCards(sortedFilmCards, filmCardElement);

        if (showingFilmCount >= filmCards.length) {
          remove(this._buttonShowMore);
        }
      });
    };

    const container = this._container;
    const isAllFilmCardsArchived = filmCards.every((film) => film.isArchive);
    const filters = generateFilters();
    render(container, new Filter(filters), RenderPosition.BEFOREEND);
    render(container, this._sort, RenderPosition.BEFOREEND);

    if (isAllFilmCardsArchived) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmsContainer, RenderPosition.BEFOREEND);

    const filmsContainer = container.querySelector(`.films`);


    render(filmsContainer, this._filmsCommentContainer, RenderPosition.BEFOREEND);
    render(filmsContainer, this._filmsExtraContainer, RenderPosition.BEFOREEND);

    const filmCardElement = filmsContainer.querySelector(`.films-list`).querySelector(`.films-list__container`);
    const filmsCardTopRated = filmsContainer.querySelector(`.rated`);
    const filmsCardMostCommented = filmsContainer.querySelector(`.commented`);
    const buttonShowMore = container.querySelector(`.films-list`);

    let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

    const filmTopCards = filmCards.slice().sort((prev, next) => next.filmRating - prev.filmRating);
    const filmMostCommentedCards = filmCards.slice().sort((prev, next) => next.comment.length - prev.comment.length);


    renderFilmCards(filmCards.slice(0, showingFilmCount), filmCardElement);
    renderFilmCards(filmTopCards.slice(0, FILM_TOP_COUNT), filmsCardTopRated);
    renderFilmCards(filmMostCommentedCards.slice(0, FILM_MOST_COMMENTED_COUNT), filmsCardMostCommented);


    renderLoadMoreButton();

    this._sort.setSortTypeChangeHandler((sortType) => {
      showingFilmCount = SHOWING_FILM_COUNT_BY_BUTTON;

      const sortedFilmCards = getSortedTasks(filmCards, sortType, 0, showingFilmCount);

      filmCardElement.innerHTML = ``;
      renderFilmCards(sortedFilmCards, filmCardElement);

      renderLoadMoreButton();
    });
  }
}
