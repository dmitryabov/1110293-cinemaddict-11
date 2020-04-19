import {PROFILE_RATINGS} from '../const.js';
import {createElement} from "../utils.js";

const getRating = (profileInformation) => {
  let ratingProfile = profileInformation.rating;
  ratingProfile = ratingProfile >= 21 ? `movie buff` : PROFILE_RATINGS[Math.ceil(ratingProfile / 10)];
  return {
    rating: ratingProfile,
    avatar: `bitmap@2x.png`
  };

};

const headerProfileTemplate = (profile) => {
  const profileInformation = getRating(profile);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileInformation.rating}</p>
      <img class="profile__avatar" src="images/${profileInformation.avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(profile) {
    this._profile = profile;

    this._element = null;
  }

  getTemplate() {
    return headerProfileTemplate(this._profile);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
