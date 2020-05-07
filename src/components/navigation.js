import AbstractComponent from "./abstract-component.js";
import {FilterType} from '../const';


const createFilterTemplate = (filtres) => {

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filtres.countWatchlist}</span></a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item">History <span class="main-navigation__item-count">${filtres.countHistory}</span></a>
        <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filtres.countFavorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

/**
 * @class
 * @param {object} filter массив с названием фильтров
 */
export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;

  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getFilterType() {

  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;

      if (this._currenFilterType === filterType) {
        return;
      }

      this._currenFilterType = filterType;

      handler(this._currenFilterType);
    });

  }
}
