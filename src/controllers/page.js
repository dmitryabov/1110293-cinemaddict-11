import NoFilmsComponent from "../components/no-films.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import ButtonShowMore from '../components/button-show-more.js';
import FilmsContainer from '../components/container.js';
import FilmsExtraContainer from '../components/films-extra.js';
import Filter from '../components/navigation.js';
import Sort, {SortType} from '../components/sorting';
import {generateFilters} from '../mock/filter';
import {FILM_LIST_CATEGORIES} from '../const';


const FILM_TOP_COUNT = 2;
const FILM_MOST_COMMENTED_COUNT = 2;
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;


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

    this._filmCards = [];
    this._showingFilmCount = SHOWING_FILM_COUNT_ON_START;
    this._sort = new Sort();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsContainer = new FilmsContainer();
    this._filmsCommentContainer = new FilmsExtraContainer(FILM_LIST_CATEGORIES.COMMENT);
    this._filmsExtraContainer = new FilmsExtraContainer(FILM_LIST_CATEGORIES.RATE);
    this._buttonShowMore = new ButtonShowMore();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);

  }

  render(filmCards) {
    this._filmCards = filmCards;

    const container = this._container;
    const isAllFilmCardsArchived = this._filmCards.every((film) => film.isArchive);
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


    const filmTopCards = this._filmCards.slice().sort((prev, next) => next.filmRating - prev.filmRating);
    const filmMostCommentedCards = this._filmCards.slice().sort((prev, next) => next.comment.length - prev.comment.length);


    renderFilmCards(this._filmCards.slice(0, this._showingFilmCount), filmCardElement);
    renderFilmCards(filmTopCards.slice(0, FILM_TOP_COUNT), filmsCardTopRated);
    renderFilmCards(filmMostCommentedCards.slice(0, FILM_MOST_COMMENTED_COUNT), filmsCardMostCommented);

    this._renderLoadMoreButton();

  }

  _renderLoadMoreButton() {
    if (this._showingFilmCount >= this._filmCards.length) {
      return;
    }

    const container = this._container.querySelector(`.films-list`);
    render(container, this._buttonShowMore, RenderPosition.BEFOREEND);


    this._buttonShowMore.setClickHandler(() => {
      const prevFilmCardCount = this._showingFilmCount;
      const filmsContainer = container.querySelector(`.films`);
      const filmCardElement = filmsContainer.querySelector(`.films-list`).querySelector(`.films-list__container`);
      this._showingFilmCount = this._showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

      const sortedFilmCards = getSortedTasks(this._filmCards, this._sort.getSortType(), prevFilmCardCount, this._showingFilmCount);

      renderFilmCards(sortedFilmCards, filmCardElement);

      if (this._showingFilmCount >= this._filmCards.length) {
        remove(this._buttonShowMore);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingFilmCount = SHOWING_FILM_COUNT_BY_BUTTON;
    const container = this._container.querySelector(`.films-list`);
    const filmsContainer = container.querySelector(`.films`);
    const filmCardElement = filmsContainer.querySelector(`.films-list`).querySelector(`.films-list__container`);

    const sortedFilmCards = getSortedTasks(this._filmCards, sortType, 0, this._showingFilmCount);

    filmCardElement.innerHTML = ``;

    renderFilmCards(sortedFilmCards, filmCardElement);

    this._renderLoadMoreButton();
  }
}
