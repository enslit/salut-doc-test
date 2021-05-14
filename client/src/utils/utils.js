export const setNextMonth = (date) => {
  const nextMonth = new Date(date);
  nextMonth.setMonth(
    nextMonth.getMonth() === 11 ? 1 : nextMonth.getMonth() + 1
  );
  nextMonth.setDate(1);
  nextMonth.setHours(0);
  nextMonth.setMinutes(0);
  nextMonth.setSeconds(0);

  return nextMonth;
};

export const setNextDay = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  d.setHours(9);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
};

export const setStartDayTime = (date) => {
  const d = new Date(date);
  d.setHours(9);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
};

export const normalizeTime = (date) => {
  const d = new Date(date);

  if (d.getHours() < 9) {
    d.setHours(9);
    d.setMinutes(0);
  } else {
    d.setHours(d.getMinutes() > 30 ? d.getHours() + 1 : d.getHours());
    d.setMinutes(d.getMinutes() > 30 ? 0 : 30);
  }
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d;
};

export const getEndDayTime = (date) => {
  const d = new Date(date);
  d.setHours(18);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime();
};
