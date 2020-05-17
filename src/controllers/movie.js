import Card from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {render, replace, RenderPosition} from "../utils/render.js";
import {append} from "../utils/appendChild.js";
import {removeElement} from "../utils/removeChild.js";
import {remove} from "../utils/render.js";
import {Keys} from "../const.js";
import CommentsBoardComponent from "../components/comments-board.js";
import CommentsModel from "../models/comments.js";
import Movie from "../models/movie.js";


const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

let filmsToUpdate = [];

export default class MovieController {
  constructor(container, onDataChange, onViewChange, onModelDataChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;


    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onModelDataChange = onModelDataChange;
    this._commentsModel = null;
    this.commentsBoardComponent = null;
    this.commentComponent = null;
    this._siteMain = document.querySelector(`.main`);

  }

  _appendDetailToFilmCard() {
    this._filmDetailsComponent.getElement().remove();
    this._mode = Mode.DEFAULT;

    this._filmDetailsComponent.removeClickHandler(() => {
      this._appendDetailToFilmCard();
    });

    document.removeEventListener(`keydown`, (evt) => {
      if (evt.key === Keys.ESC_KEY) {
        this._appendDetailToFilmCard();
      }
    });

  }


  render(filmCard) {

    const oldFilmComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;


    this._filmCardComponent = new Card(filmCard);
    this._filmDetailsComponent = new FilmDetails(filmCard);
    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(filmCard);


    const onPosterClick = () => {
      if (this._filmDetailsComponent) {
        remove(this._filmDetailsComponent);
      }

      this._mode = Mode.DEFAULT;
      this._onViewChange(filmCard);

      filmsToUpdate = filmsToUpdate.concat({
        filmCard,
        commentsModel: this._commentsModel,
      });


      append(this._siteMain, this._filmDetailsComponent);
      this._mode = Mode.POPUP;

      this.renderCommentsBoard(filmCard);

      this._filmDetailsComponent.setClickHandler(() => {
        this._appendDetailToFilmCard(filmCard);
        this._updateFilm();
      });

      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === Keys.ESC_KEY) {
          this._appendDetailToFilmCard(filmCard);
          this._updateFilm();
        }
      });

      this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
        const newFilm = Movie.clone(filmCard);
        newFilm.isWatchlist = !newFilm.isWatchlist;

        this._onDataChange(this, filmCard, newFilm);
      });


      this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
        const newFilm = Movie.clone(filmCard);
        newFilm.isWatched = !newFilm.isWatched;

        this._onDataChange(this, filmCard, newFilm);
      });

      this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
        const newFilm = Movie.clone(filmCard);
        newFilm.isFavorites = !newFilm.isFavorites;

        this._onDataChange(this, filmCard, newFilm);
      });
    };

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }


    this._filmCardComponent.setClickHandler(() => {
      onPosterClick();
    }, `.film-card__poster`);

    this._filmCardComponent.setClickHandler(() => {
      onPosterClick();
    }, `.film-card__title`);

    this._filmCardComponent.setClickHandler(() => {
      onPosterClick();
    }, `.film-card__comments`);


    this._filmCardComponent.setAddToWatchlistClick((evt) => {
      evt.preventDefault();

      const newFilm = Movie.clone(filmCard);
      newFilm.isWatchlist = !newFilm.isWatchlist;

      this._onDataChange(this, filmCard, newFilm);
    });

    this._filmCardComponent.setMarkAsWatchedClick((evt) => {
      evt.preventDefault();
      const newFilm = Movie.clone(filmCard);
      newFilm.isWatched = !newFilm.isWatched;

      this._onDataChange(this, filmCard, newFilm);
    });

    this._filmCardComponent.setAddToFavoriteClick((evt) => {
      evt.preventDefault();

      const newFilm = Movie.clone(filmCard);
      newFilm.isFavorites = !newFilm.isFavorites;

      this._onDataChange(this, filmCard, newFilm);

    });

  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._appendDetailToFilmCard();
    }
  }

  _updateFilm() {
    filmsToUpdate.forEach((it) => {

      const newFilm = Movie.clone(it.filmCard);
      // newFilm.comments = it.commentsModel.getComments(it.filmCard);
      this._onDataChange(this, it.filmCard, newFilm);
    });
    filmsToUpdate = [];
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmCardComponent);
  }


  renderCommentsBoard(filmCard) {
    const commentsSection = this._siteMain.querySelector(`.form-details__bottom-container`);
    this._commentBoardComponent = new CommentsBoardComponent(this._commentsModel, filmCard.emoji);
    render(commentsSection, this._commentBoardComponent, RenderPosition.BEFOREEND);
    this._commentBoardComponent.renderAllComments();
    this._commentBoardComponent.addNewCommentHandler();
  }

}
