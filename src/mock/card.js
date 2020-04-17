const directors = [`Guns Akimbo`, `Anthony Mann`, `Martians Momar`, `Richard Jewell`];

const writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Martians Momar`, `Richard Jewell`];

const actors = [`Erich von Stroheim`, `Dan Duryea`, `Erich von Stroheim`, `MaryHughes`, `Dan Duryea`];

const countries = [`USA`, `USSR`, `Kanada`, `Dath`, `Italy`, `Russia`];

const filmTitles = [`Guns Akimbo`, `Bombshell`, `Swallow`, `The Song of Names`, `Richard Jewell`];

const filmPosters = [
  `made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const filmDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const genres = [`Comedy`, `Drama`, `Mystery`, `Cartoon`, `Western`];

const filmTtitleOriginals = [`Guns Akimbo`, `Bombshell`, `Swallow`, `The Song of Names`, `Richard Jewell`];

const ageRatings = [`6+`, `12+`, `0+`, `18+`];

const emojis = [`smile`, `sleeping`, `puke`, `angry`];

const commentText = [`Interesting setting and cast`, `Boooooooring`, `Very old. Meh`, `Almost two hours? Seriously?`];

const authors = [`Jon`, `Ban`, `Mickle`, `Andry`];

const commentDays = [`2019/02/31 03:519`, `2019/01/01 44:59`, `2011/14/41 23:59`, `2019/11/11 13:29`];

const releaseDates = [`11 June 1905`, `30 May 1911`, `12 April 1988`, `01 April 1995`];


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
      emoji: getRandomArrayItem(emojis),
      text: getRandomArrayItem(commentText),
      author: getRandomArrayItem(authors),
      commentDay: getRandomArrayItem(commentDays)
    };
    comments.push(filmComments);
  }
  return comments;
};


const generateCard = () => {
  return {
    director: getRandomArrayItem(directors),
    writer: writers.slice(getRandomIntegerNumber(1, writers.length)).join(`, `),
    actor: actors.slice(getRandomIntegerNumber(1, actors.length)).join(`, `),
    releaseDate: getRandomArrayItem(releaseDates),
    runtime: `1h ${getRandomIntegerNumber(1, 60)}m`,
    country: countries.slice(getRandomIntegerNumber(1, actors.length)).join(`, `),
    genres: genres.slice(getRandomIntegerNumber(1, countries.length)),
    filmDescription: getRandomArrayItem(filmDescriptions),
    filmTitle: getRandomArrayItem(filmTitles),
    poster: filmPosters[getRandomIntegerNumber(1, 5)],
    comment: generateComments(getRandomIntegerNumber(1, 10)),
    filmRating: getRandomIntegerNumber(1, 10),
    filmTtitleOriginal: getRandomArrayItem(filmTtitleOriginals),
    ageRating: getRandomArrayItem(ageRatings),
  };
};


const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};


export {generateCards};
