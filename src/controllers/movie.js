import Card from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {render, replace, RenderPosition} from "../utils/render.js";
import {append} from "../utils/appendChild.js";
import {removeElement} from "../utils/removeChild.js";
import {remove} from "../utils/render.js";
import {Keys} from "../const.js";
import CommentsBoardComponent from "../components/comments-board.js";
import CommentsModel from "../moment/comments.js";


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

  }

  _appendDetailToFilmCard() {
    removeElement(document.querySelector(`body`), this._filmDetailsComponent);
    this._mode = Mode.DEFAULT;

    document.removeEventListener(`keydown`, (evt) => {
      if (evt.key === Keys.ESC_KEY) {
        this._appendDetailToFilmCard();
      }
    });

  }


  render(filmCard) {
    this._filmCard = filmCard;

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


      append(document.querySelector(`body`), this._filmDetailsComponent);
      this._mode = Mode.POPUP;

      this.renderCommentsBoard(filmCard);

      this._filmDetailsComponent.setCloseButtonClickHandler(() => {
        this._appendDetailToFilmCard();
        this._updateFilm();
      });

      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === Keys.ESC_KEY) {
          this._appendDetailToFilmCard();
          this._updateFilm();
        }
      });
    };

    this._filmDetailsComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      filmCard = this._onModelDataChange(filmCard, Object.assign({}, filmCard, {
        isWatchlist: !filmCard.isWatchlist,
      }));
      filmsToUpdate[filmsToUpdate.length - 1].film = filmCard;
    });


    this._filmDetailsComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      filmCard = this._onModelDataChange(filmCard, Object.assign({}, filmCard, {
        isWatched: !filmCard.isWatched,
      }));
      filmsToUpdate[filmsToUpdate.length - 1].film = filmCard;
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();

      filmCard = this._onModelDataChange(filmCard, Object.assign({}, filmCard, {
        isFavorites: !filmCard.isFavorites,
      }));
      filmsToUpdate[filmsToUpdate.length - 1].film = filmCard;
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent);
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
      this._onDataChange(this, this._filmCard, Object.assign({}, this._filmCard, {
        isWatchlist: !filmCard.isWatchlist,
      }));
    });

    this._filmCardComponent.setMarkAsWatchedClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmCard, Object.assign({}, this._filmCard, {
        isWatched: !filmCard.isWatched,
      }));
    });

    this._filmCardComponent.setAddToFavoriteClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmCard, Object.assign({}, this._filmCard, {
        isFavorites: !filmCard.isFavorites,
      }));

    });


    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatchlist: !filmCard.isWatchlist,
      }));

    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isWatched: !filmCard.isWatched,
      }));
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, filmCard, Object.assign({}, filmCard, {
        isFavorites: !filmCard.isFavorites,
      }));
    });

  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._appendDetailToFilmCard();
    }
  }

  _updateFilm() {
    filmsToUpdate.forEach((it) => {
      this._onDataChange(this, it.filmCard, Object.assign({}, it.filmCard, {
        comment: it.commentsModel.getComments(it.filmCard),
      }));
    });
    filmsToUpdate = [];
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmCardComponent);
  }


  renderCommentsBoard(filmCard) {
    const commentsSection = document.querySelector(`.form-details__bottom-container`);
    this._commentBoardComponent = new CommentsBoardComponent(this._commentsModel, filmCard.emoji);
    render(commentsSection, this._commentBoardComponent, RenderPosition.BEFOREEND);
    this._commentBoardComponent.renderAllComments();
    this._commentBoardComponent.addNewCommentHandler();
  }

}
