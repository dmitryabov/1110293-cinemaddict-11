const DIRECTORS = [`Guns Akimbo`, `Anthony Mann`, `Martians Momar`, `Richard Jewell`];

const WRITERS = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Martians Momar`, `Richard Jewell`];

const ACTORS = [`Erich von Stroheim`, `Dan Duryea`, `Erich von Stroheim`, `MaryHughes`, `Dan Duryea`];

const CONTRIES = [`USA`, `USSR`, `Kanada`, `Dath`, `Italy`, `Russia`];

const FILM_TITLES = [`Guns Akimbo`, `Bombshell`, `Swallow`, `The Song of Names`, `Richard Jewell`];

const FILM_POSTERS = [
  `made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const FILM_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const GENRES = [`Comedy`, `Drama`, `Mystery`, `Cartoon`];

const FILM_TITLE_ORIGINALS = [`Guns Akimbo`, `Bombshell`, `Swallow`, `The Song of Names`, `Richard Jewell`];

const AGE_RATING = [`6+`, `12+`, `0+`, `18+`];

const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

const COMMENT_TEXT = [`Interesting setting and cast`, `Boooooooring`, `Very old. Meh`, `Almost two hours? Seriously?`];

const AUTHORS = [`Jon`, `Ban`, `Mickle`, `Andry`];

const COMMENT_DAYS = [`2019/02/31 03:519`, `2019/01/01 44:59`, `2011/14/41 23:59`, `2019/11/11 13:29`];

const RELEASE_DAYS = [`11 June 1905`, `30 May 1911`, `12 April 1988`, `01 April 1995`];


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


const generateComments = (numberOfComments) => {
  const comments = [];
  for (let i = 0; i < numberOfComments; i++) {
    const filmComments = {
      emoji: getRandomArrayItem(EMOJIS),
      text: getRandomArrayItem(COMMENT_TEXT),
      author: getRandomArrayItem(AUTHORS),
      commentDay: getRandomArrayItem(COMMENT_DAYS)
    };
    comments.push(filmComments);
  }
  return comments;
};


const generateCard = () => {
  return {
    director: getRandomArrayItem(DIRECTORS),
    writer: WRITERS.slice(getRandomIntegerNumber(1, WRITERS.length)),
    actor: ACTORS.slice(getRandomIntegerNumber(1, ACTORS.length)),
    releaseDate: getRandomArrayItem(RELEASE_DAYS),
    runtime: `1h ${getRandomIntegerNumber(1, 60)}m`,
    country: CONTRIES.slice(getRandomIntegerNumber(1, CONTRIES.length)),
    genres: GENRES.slice(getRandomIntegerNumber(1, GENRES.length)),
    filmDescription: getRandomArrayItem(FILM_DESCRIPTIONS),
    filmTitle: getRandomArrayItem(FILM_TITLES),
    poster: FILM_POSTERS[getRandomIntegerNumber(1, 5)],
    comment: generateComments(getRandomIntegerNumber(1, 10)),
    filmRating: getRandomIntegerNumber(1, 10),
    filmTtitleOriginal: getRandomArrayItem(FILM_TITLE_ORIGINALS),
    ageRating: getRandomArrayItem(AGE_RATING),
    isWatchlist: true,
    isWatched: true,
    isFavorites: true
  };
};


const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};


export {generateCards};
