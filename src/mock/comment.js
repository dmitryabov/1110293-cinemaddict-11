const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

const COMMENT_TEXT = [`Interesting setting and cast`, `Boooooooring`, `Very old. Meh`, `Almost two hours? Seriously?`];

const AUTHORS = [`Jon`, `Ban`, `Mickle`, `Andry`];

const COMMENT_DAYS = [`2020/01/11 11:19`, `2019/12/12 10:20`, `2020/02/11 10:19`, `2019/11/11 13:29`];

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
    text: getRandomArrayItem(COMMENT_TEXT),
    emoji: getRandomArrayItem(EMOJIS) + `.png`,
    author: getRandomArrayItem(AUTHORS),
    date: getRandomArrayItem(COMMENT_DAYS)
  };
};

const generateComments = () => {
  return new Array(getRandomIntegerNumber(1, 10))
    .fill(``)
    .map(generateComment);
};

export {generateComments, EMOJIS};
