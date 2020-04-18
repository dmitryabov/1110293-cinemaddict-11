export const filmCardTemplate = (card) => {
  const {filmTitle, poster, filmDescription, filmRating,
    releaseDate, runtime, genres} = card;


  return (
    `<article class="film-card">
    <h3 class="film-card__title">${filmTitle}</h3>
    <p class="film-card__rating">${filmRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmDescription}</p>
    <a class="film-card__comments">${card.comment.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};
