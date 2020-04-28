import AbstractComponent from "./abstract-component.js";


const createButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

/**
 * @class
 * @return {string} возвращает разметку кнопки "Show more"
 */
export default class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createButtonShowMoreTemplate();
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

}
