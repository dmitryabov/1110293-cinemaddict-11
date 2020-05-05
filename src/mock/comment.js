const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

const COMMENT_TEXT = [`Interesting setting and cast`, `Boooooooring`, `Very old. Meh`, `Almost two hours? Seriously?`];

const AUTHORS = [`Jon`, `Ban`, `Mickle`, `Andry`];

const COMMENT_DAYS = [`2019/02/31 03:519`, `2019/01/01 44:59`, `2011/14/41 23:59`, `2019/11/11 13:29`];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};


const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    emoji: getRandomArrayItem(EMOJIS),
    text: getRandomArrayItem(COMMENT_TEXT),
    author: getRandomArrayItem(AUTHORS),
    date: getRandomArrayItem(COMMENT_DAYS)
  };
};

const generateComments = () => {
  return new Array(getRandomIntegerNumber(1, 10))
    .fill(``)
    .map(generateComment);
};

export {generateComments};
