export const getTomorrowTimestamp = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d.getTime();
};

export const normalizeTime = (date) => {
  const d = new Date(date);

  if (d.getHours() < 9) {
    d.setHours(9);
    d.setMinutes(0);
  } else {
    d.setHours(d.getMinutes() > 30 ? d.getHours() + 1 : d.getHours());
    d.setMinutes(d.getMinutes() < 30 ? 0 : 30);
  }
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d.getTime();
};

export const getEndDayTime = (date) => {
  const d = new Date(date);
  d.setHours(18);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime();
};
