const zeroLatch = (num) => (num < 0) ? 0 : num;

const negativeLatch = (num) => (num < 0) ? num : 0;

const create = (width, height, populate) => {
  const arr = [height];
  for (let row = 0; row < height; row++) {
    arr[row] = [];
    for (let column = 0; column < width; column++) {
      arr[row][column] = populate ? populate(row, column) : null;
    }
  }
  return arr;
};

const cleanse = (arr) => arr.filter(cell => (cell !== null) && (cell !== undefined));

const copy = (arr) => [...arr].map(row => [...row]);

const exists = (x, y, arr) => Boolean(arr[x] && arr[x][y]);

const get = (x, y, arr) => {
  try {
    return (exists(x, y, arr)) ? arr[x][y] : null;
  } catch (error) {
    return null;
  }
};

const set = (x, y, value, arr) => {
  try {
    arr[x][y] = value;
    return arr;
  } catch (error) {
    return null;
  }
};

module.exports = {
  cleanse,
  copy,
  create,
  exists,
  get,
  negativeLatch,
  set,
  zeroLatch,
};