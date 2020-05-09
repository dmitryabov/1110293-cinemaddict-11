import FilterComponent from "../components/navigation.js";
import {FilterType} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getFilteredFilms} from "../utils/filter.js";


export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const filmCards = this._filmsModel.getMoviesAll();
    const filters =
     {
       countWatchlist: getFilteredFilms(filmCards, FilterType.WATCHLIST).length,
       countHistory: getFilteredFilms(filmCards, FilterType.HISTORY).length,
       countFavorites: getFilteredFilms(filmCards, FilterType.FAVORITES).length,

     };

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
