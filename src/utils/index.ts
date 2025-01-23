export const randomizeKey = () =>
  String(Math.random() * Math.random() * Math.random());

export const createOrderedArray = (
  n: number,
  reverse: boolean = false
): number[] => {
  if (reverse) {
    return Array.from({ length: n }, (_, index) => n - index);
  }
  return Array.from({ length: n }, (_, index) => index + 1);
};
