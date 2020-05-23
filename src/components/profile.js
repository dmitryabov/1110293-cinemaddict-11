import {PROFILE_RATINGS} from '../const.js';
import AbstractComponent from "./abstract-component.js";

const getRating = (profileInformation) => {
  let ratingProfile = profileInformation.length;
  ratingProfile = ratingProfile >= 21 ? `movie buff` : PROFILE_RATINGS[Math.ceil(ratingProfile / 10)];
  return {
    rating: ratingProfile,
    avatar: `bitmap@2x.png`
  };

};

const createHeaderProfileTemplate = (profile) => {
  const profileInformation = getRating(profile);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileInformation.rating}</p>
      <img class="profile__avatar" src="images/${profileInformation.avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};
/**
 * @class
 * @param {object} profile объект с информацией о рейтинге и аватаре пользователя
 */
export default class Profile extends AbstractComponent {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._profile);
  }
}
