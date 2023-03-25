const colors = [
  "#49c4e5",
  "#8471f2",
  "#67e2ae",
  "#f0ae75",
  "#75dbf0",
  "#75f079",
  "#8e75f0",
  "#f075c7",
  "#f07575",
  "#f0d675",
  "#f075f0",
  "#75f0f0",
  "#75f0a5",
  "#f0f075",
  "#f0a575",
  "#f07575",
];

export const getColorByIndex = (index: number) => {
  if (index < colors.length) {
    return colors[index];
  }
  const equivalentIndex = index % colors.length;
  return colors[equivalentIndex];
};
