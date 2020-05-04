import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM Y`);
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};
