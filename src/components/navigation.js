import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (name, count) => {
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};


const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it.name, it.count)).join(`\n`);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;

  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }
}
