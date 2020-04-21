import {createElement} from "../utils.js";


const createMovieStaisticTemplate = (movieStaistic) => {
  return (`<p>${movieStaistic.length} movies inside</p>`);
};


export default class MovieStaistic {
  constructor(movieStaistic) {
    this._movieStaistic = movieStaistic;

    this._element = null;
  }

  getTemplate() {
    return createMovieStaisticTemplate(this._movieStaistic);
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
