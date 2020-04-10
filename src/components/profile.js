const getRating = (profileInformation) => {
  let ratingProfile = profileInformation.rating;
  if (ratingProfile <= 0) {
    ratingProfile = ``;
  } else if (ratingProfile > 0 && ratingProfile <= 10) {
    ratingProfile = `novice`;
  } else if (ratingProfile > 10 && ratingProfile <= 20) {
    ratingProfile = `fan`;
  } else if (ratingProfile > 20) {
    ratingProfile = `movie buff`;
  }
  return {
    rating: ratingProfile,
    avatar: `bitmap@2x.png`
  };
};


export const headerProfileTemplate = (profile) => {
  const profileInformation = getRating(profile);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileInformation.rating}</p>
      <img class="profile__avatar" src="images/${profileInformation.avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};
