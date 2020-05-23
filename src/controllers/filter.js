import FilterComponent from "../components/filter.js";
import {FilterType} from "../const.js";
import {render, replace, RenderPosition, remove} from "../utils/render.js";
import {getFilteredFilms} from "../utils/filter.js";
import Statistics from '../components/statistics.js';
import moment from "moment";


export default class FilterController {
  constructor(container, filmsModel, pageController) {
    this._container = container;
    this._filmsModel = filmsModel;
    this.pageController = pageController;
    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._statisticsComponent = null;
    this._watchedFilms = null;
    this._onStatsPeriodChangeHandler = this._onStatsPeriodChangeHandler.bind(this);


    this.Periods = {
      "All time": true,
      "Today": false,
      "Week": false,
      "Month": false,
      "Year": false
    };

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

    this._watchedFilms = this._filmsModel.getMoviesAll().filter((movies) => movies.isWatched === true);
    this._statisticsComponent = new Statistics(this._watchedFilms, this.Periods);
    render(container, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.setPeriodChangeHandler(this._onStatsPeriodChangeHandler);
    this._statisticsComponent.hide();
  }

  _onFilterChange(filterType) {
    if (filterType === `Stats`) {
      this._filmsModel.setFilter(filterType);
      this._activeFilterType = filterType;
      this._statisticsComponent.show();
      this.pageController.hide();
    } else {
      this._filmsModel.setFilter(filterType);
      this._activeFilterType = filterType;
      this._statisticsComponent.hide();
      this.pageController.show();
    }
  }


  _onDataChange() {
    remove(this._statisticsComponent);
    this.render();
  }

  _resetPeriods() {
    for (const period in this.Periods) {
      if (Object.prototype.hasOwnProperty.call(this.Periods, period)) {
        this.Periods[period] = false;
      }
    }
  }

  _onStatsPeriodChangeHandler(evt) {
    const today = new Date();
    let filteredFilms;
    this._watchedFilms = this._filmsModel.getMoviesAll().filter((movies) => movies.isWatched === true);

    switch (evt.target.value) {
      case `today`:
        filteredFilms = this._watchedFilms.filter((film) => moment(film.watchingDate).isAfter(today.setDate(today.getDate() - 1)));
        this._resetPeriods();
        this.Periods[`Today`] = true;
        break;
      case `week`:
        filteredFilms = this._watchedFilms.filter((film) => moment(film.watchingDate).isAfter(today.setDate(today.getDate() - 7)));
        this._resetPeriods();
        this.Periods[`Week`] = true;
        break;
      case `month`:
        filteredFilms = this._watchedFilms.filter((film) => moment(film.watchingDate).isAfter(today.setMonth(today.getMonth() - 1)));
        this._resetPeriods();
        this.Periods[`Month`] = true;
        break;
      case `year`:
        filteredFilms = this._watchedFilms.filter((film) => moment(film.watchingDate).isAfter(today.setYear(today.getYear() - 1)));
        this._resetPeriods();
        this.Periods[`Year`] = true;
        break;
      default:
        filteredFilms = this._watchedFilms;
        this._resetPeriods();
        this.Periods[`All time`] = true;
    }

    remove(this._statisticsComponent);
    this._statisticsComponent = new Statistics(filteredFilms, this.Periods);
    render(this._container, this._statisticsComponent, RenderPosition.BEFOREEND);
    this._statisticsComponent.setPeriodChangeHandler(this._onStatsPeriodChangeHandler);
  }


}
