import moment from "moment";

export const convertUTCToLocal = (utcTime) =>
  moment.utc(utcTime, "HH:mm:ss").local().format("hh:mm:ss A");
