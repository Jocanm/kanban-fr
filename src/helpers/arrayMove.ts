export const arrayMove = <T>(array: T[], from: number, to: number) => {
  const newArray = [...array];
  const item = newArray.splice(from, 1)[0];
  newArray.splice(to, 0, item);
  return newArray;
};
