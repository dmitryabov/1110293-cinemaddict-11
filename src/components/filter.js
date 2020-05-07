import AbstractComponent from "./abstract-component.js";

const HREF_PREFIX = `#`;

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  const activeClass = isChecked === filter ? `main-navigation__item--active` : ``;
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item ${activeClass}">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};


const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
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
  constructor(filter) {
    super();
    this._filter = filter;

  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }


  setFilterChangeClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();
        const selectedFilter = evt.target.getAttribute(`href`).substring(HREF_PREFIX.length);
        if (selectedFilter === this._isChecked) {
          return;
        }
        handler(selectedFilter);
        this._isChecked = selectedFilter;
        this.rerender();
      }
    });
    this.filterChangeHandler = handler;
  }

}
