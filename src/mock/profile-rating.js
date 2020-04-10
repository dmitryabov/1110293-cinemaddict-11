const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


export const profileInformations =
  {
    rating: getRandomIntegerNumber(0, 30),
    avatar: `bitmap@2x.png`
  }
;
