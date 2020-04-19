import {createElement} from "../utils.js";


const createFilmStaisticTemplate = (cards) => {
  return (`<p>${cards.length} movies inside</p>`);
};


export default class FilmStaistic {
  constructor(filmStaistic) {
    this._filmStaistic = filmStaistic;

    this._element = null;
  }

  getTemplate() {
    return createFilmStaisticTemplate(this._filmStaistic);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
