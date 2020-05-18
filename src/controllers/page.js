import NoFilmsComponent from "../components/no-films.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import ButtonShowMore from '../components/button-show-more.js';
import FilmsContainer from '../components/container.js';
import FilmsExtraContainer from '../components/films-extra.js';
import Sort, {SortType} from '../components/sorting';
import {FILM_LIST_CATEGORIES} from '../const';
import MovieController from "./movie.js";


const FILM_TOP_COUNT = 2;
const FILM_MOST_COMMENTED_COUNT = 2;
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;


const renderFilmCards = (filmCardElement, filmCards, onDataChange, onViewChange, api) => {
  return filmCards.map((filmCard) => {
    const movieController = new MovieController(filmCardElement, onDataChange, onViewChange, api);

    movieController.render(filmCard);

    return movieController;
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
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._filmCards = [];
    this._showedMovieControllers = [];
    this._showingFilmCount = SHOWING_FILM_COUNT_ON_START;
    this._sort = new Sort();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsContainer = new FilmsContainer();
    this._filmsCommentContainer = new FilmsExtraContainer(FILM_LIST_CATEGORIES.COMMENT);
    this._filmsExtraContainer = new FilmsExtraContainer(FILM_LIST_CATEGORIES.RATE);
    this._buttonShowMore = new ButtonShowMore();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._onViewChange = this._onViewChange.bind(this);

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);

  }

  render() {
    const filmCards = this._filmsModel.getMovies();

    const container = this._container;
    const isAllFilmCardsArchived = filmCards.every((film) => film.isArchive);
    render(container, this._sort, RenderPosition.BEFOREEND);

    if (isAllFilmCardsArchived) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmsContainer, RenderPosition.BEFOREEND);

    const filmsContainer = container.querySelector(`.films`);
    const filmTopCards = filmCards.slice().sort((prev, next) => next.filmRating - prev.filmRating);
    const filmMostCommentedCards = filmCards.slice().sort((prev, next) => next.comment.length - prev.comment.length);

    render(filmsContainer, this._filmsCommentContainer, RenderPosition.BEFOREEND);
    render(filmsContainer, this._filmsExtraContainer, RenderPosition.BEFOREEND);

    this._renderFilms(filmCards.slice(0, this._showingFilmCount));
    this._renderTopFilms(filmTopCards.slice(0, FILM_TOP_COUNT));
    this._renderMostFilms(filmMostCommentedCards.slice(0, FILM_MOST_COMMENTED_COUNT));

    this._renderLoadMoreButton();
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderFilms(filmCards) {
    const filmCardElement = this._filmsContainer.getElement().querySelector(`.films-list`).querySelector(`.films-list__container`);
    const newFilms = renderFilmCards(filmCardElement, filmCards, this._onDataChange, this._onViewChange, this._api);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
    this._showingFilmCount = this._showedMovieControllers.length;
  }

  _renderTopFilms(filmCards) {
    const filmsCardTopRated = this._filmsContainer.getElement().querySelector(`.rated`);
    const newTopFilms = renderFilmCards(filmsCardTopRated, filmCards, this._onDataChange, this._onViewChange, this._api);
    this._showedMovieControllers = this._showedMovieControllers.concat(newTopFilms);
  }

  _renderMostFilms(filmCards) {
    const filmsCardMostCommented = this._filmsContainer.getElement().querySelector(`.commented`);
    const newMostFilms = renderFilmCards(filmsCardMostCommented, filmCards, this._onDataChange, this._onViewChange, this._api);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMostFilms);
  }

  _updateTasks(count) {
    this._removeMovies();
    this._renderFilms(this._filmsModel.getMovies().slice(0, count));
    const filmTopCards = this._filmsModel.getMovies().slice().sort((prev, next) => next.filmRating - prev.filmRating);
    this._renderTopFilms(filmTopCards.slice(0, FILM_TOP_COUNT));
    const filmMostCommentedCards = this._filmsModel.getMovies().slice().sort((prev, next) => next.comment.length - prev.comment.length);
    this._renderMostFilms(filmMostCommentedCards.slice(0, FILM_MOST_COMMENTED_COUNT));
    this._renderLoadMoreButton();
  }


  _renderLoadMoreButton() {
    remove(this._buttonShowMore);

    if (this._showingFilmCount >= this._filmsModel.getMovies().length) {
      return;
    }

    const container = this._container.querySelector(`.films-list`);
    render(container, this._buttonShowMore, RenderPosition.BEFOREEND);


    this._buttonShowMore.setClickHandler(() => {
      const prevFilmCardCount = this._showingFilmCount;
      const filmCardElement = container.querySelector(`.films-list__container`);
      const filmCards = this._filmsModel.getMovies();
      this._showingFilmCount = this._showingFilmCount + SHOWING_FILM_COUNT_BY_BUTTON;

      const sortedFilmCards = getSortedTasks(filmCards, this._sort.getSortType(), prevFilmCardCount, this._showingFilmCount);
      const newFilms = renderFilmCards(filmCardElement, sortedFilmCards, this._onDataChange, this._onViewChange, this._api);

      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);


      if (this._showingFilmCount >= filmCards.length) {
        remove(this._buttonShowMore);
      }


    });
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  _onDataChange(movieController, oldData, newData) {

    this._api.updateFilm(oldData.id, newData)
        .then((filmModel) => {
          const isSuccess = this._filmsModel.updateMovie(oldData.id, filmModel);

          if (isSuccess) {
            movieController.render(filmModel);
            this._updateTasks(this._showingFilmCount);
          }
        });
  }


  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }


  _onSortTypeChange(sortType) {
    this._showingFilmCount = SHOWING_FILM_COUNT_BY_BUTTON;
    const container = this._container.querySelector(`.films-list`);
    const filmCardElement = container.querySelector(`.films-list__container`);

    const sortedFilmCards = getSortedTasks(this._filmsModel.getMovies(), sortType, 0, this._showingFilmCount);

    filmCardElement.innerHTML = ``;

    const newFilms = renderFilmCards(filmCardElement, sortedFilmCards, this._onDataChange, this._onViewChange, this._api);
    this._showedMovieControllers = newFilms;

    this._renderLoadMoreButton();
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_FILM_COUNT_ON_START);
  }

}
