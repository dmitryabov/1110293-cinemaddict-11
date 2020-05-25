import AbstractComponent from "./abstract-component.js";

const createMovieStaisticTemplate = (movieStaistic) => {
  return (`<p>${movieStaistic.length} movies inside</p>`);
};

/**
 * @class
 * @param {object} cards массив с карточками фильмов
 */
export default class footerFilmsСountStatistic extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createMovieStaisticTemplate(this._cards);
  }
}
