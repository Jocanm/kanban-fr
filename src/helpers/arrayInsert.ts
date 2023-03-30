export const arrayInsert = <T>(array: T[], item: T, index: number) => {
  const newArray = [...array];
  newArray.splice(index, 0, item);
  return newArray;
};
