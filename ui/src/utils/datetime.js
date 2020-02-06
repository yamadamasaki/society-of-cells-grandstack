export const jsDate2cypherDate = date => date ? {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate()
} : undefined;

