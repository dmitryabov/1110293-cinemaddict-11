import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM Y`);
};

export const filmDuration = (duration) => {
  return `${moment.duration(duration, `m`).hours()}h ${moment.duration(duration, `m`).minutes()}m`;
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const shake = (element) => {
  const SHAKE_ANIMATION_TIMEOUT = 600;

  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};
