const CONTROL_NAMES = [
  {
    name: `watchlist`,
    label: `Add to watchlist`
  },
  {
    name: `watched`,
    label: `Already watched`
  },
  {
    name: `favorite`,
    label: `Add to favorites`
  },

];


const EMOJI_NAMES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const PROFILE_RATINGS = [
  ``,
  `novice`,
  `fan`,
];

const FILM_LIST_CATEGORIES = {
  RATE: {
    title: `Top rated`,
    container: `rated`,
  },
  COMMENT: {
    title: `Most commented`,
    container: `commented`
  }
};


const FilterType = {
  ALL: `all`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};


export {CONTROL_NAMES, EMOJI_NAMES, PROFILE_RATINGS, FILM_LIST_CATEGORIES, FilterType};
