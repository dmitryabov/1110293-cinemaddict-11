const directors = [`Guns Akimbo`, `Anthony Mann`, `Martians Momar`, `Richard Jewell`];

const writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];

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

const commentDays = [`2 days ago`, `1 days ago`, `3 days ago`, `6 days ago`];


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


const generateCard = () => {
  return {
    director: getRandomArrayItem(directors),
    writer: getRandomArrayItem(writers),
    actor: actors.slice(getRandomIntegerNumber(0, actors.length)).join(`, `),
    releaseDate: getRandomIntegerNumber(1908, 1999),
    runtime: `1h ${getRandomIntegerNumber(1, 60)}m`,
    country: countries.slice(getRandomIntegerNumber(0, actors.length)).join(`, `),
    genres: genres.slice(getRandomIntegerNumber(0, countries.length)).join(`, `),
    filmDescription: getRandomArrayItem(filmDescriptions),
    filmTitle: getRandomArrayItem(filmTitles),
    poster: filmPosters[getRandomIntegerNumber(1, 5)],
    comment: [
      {
        emoji: getRandomArrayItem(emojis),
        text: getRandomArrayItem(commentText),
        author: getRandomArrayItem(authors),
        commentDay: getRandomArrayItem(commentDays)
      },
      {
        emoji: getRandomArrayItem(emojis),
        text: getRandomArrayItem(commentText),
        author: getRandomArrayItem(authors),
        commentDay: getRandomArrayItem(commentDays)
      }
    ],
    filmRating: getRandomIntegerNumber(3, 9),
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
