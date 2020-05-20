
export const FilterType = {
  ALL: `all`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Stats`,
};


const getFilteredFilms = (films, filterType) => {
  let filteredFilms = [];
  const showingFilmCards = films.slice();

  switch (filterType) {
    case FilterType.ALL:
      filteredFilms = films;
      break;
    case FilterType.WATCHLIST:
      filteredFilms = showingFilmCards.filter((film) => Boolean(film.isWatchlist));
      break;
    case FilterType.HISTORY:
      filteredFilms = showingFilmCards.filter((film) => Boolean(film.isWatched));
      break;
    case FilterType.FAVORITES:
      filteredFilms = showingFilmCards.filter((film) => Boolean(film.isFavorites));
      break;

  }

  return filteredFilms;
};

export {getFilteredFilms};
