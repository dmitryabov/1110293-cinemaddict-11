import AbstractComponent from "./abstract-component.js";

/**
 * @param {string} title контейнера
 * @param {string} container селектор контейнера
 * @return {string} вернет контейнер для карточек фильмов с наибольшим рейтингом или наиболее комментируемые
 */
const createFilmsExtraContainerTemplate = (title, container) => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container ${container}">

    </div>
  </section>`
  );
};

/**
 * @class
 * @param {object} filmsListCategories передает селектор и title для контейнера FilmsExtra
 */
export default class FilmsExtraContainer extends AbstractComponent {
  constructor(filmsListCategories) {
    super();
    this._title = filmsListCategories.title;
    this._container = filmsListCategories.container;
  }
  getTemplate() {
    return createFilmsExtraContainerTemplate(this._title, this._container);
  }
}
