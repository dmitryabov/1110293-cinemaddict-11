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
  STATS: `Stats`,
};

const Keys = {
  ESC_KEY: `Escape`,
  CTRL_KEY: `Control`,
  ENTER_KEY: `Enter`,
};

const MenuMode = {
  STATISTICS: `stats`,
  FILTERS: `filter`,
};


export {EMOJI_NAMES, PROFILE_RATINGS, FILM_LIST_CATEGORIES, FilterType, Keys, MenuMode};
