import AbstractComponent from "./abstract-component.js";

const createMovieStaisticTemplate = (movieStaistic) => {
  return (`<p>${movieStaistic.length} movies inside</p>`);
};


export default class MovieStaistic extends AbstractComponent {
  constructor(movieStaistic) {
    super();
    this._movieStaistic = movieStaistic;

  }

  getTemplate() {
    return createMovieStaisticTemplate(this._movieStaistic);
  }
}
