export const countWords = words => {
  const arrayOfWords = words
    .trim()
    .split(" ")
    .filter(item => item.lenght !== 0);
  return arrayOfWords.length === 12 ? true : false;
};
