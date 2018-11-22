const { zeroLatch, negativeLatch, get, cleanse, copy } = require('./utils');
const { rowRange } = require('./operations');

const area = (x, y, size, arr) => {
  const arrCopy = copy(arr);
  return arrCopy.splice(zeroLatch(x - size), negativeLatch(x - size) + (2 * size + 1))
    .map(row => row.splice(zeroLatch(y - size), negativeLatch(y - size) + (2 * size + 1)));
};

const boundingBoxCorners = (x, y, size, arr) => {
  const corners = [];
  corners.push(get(x - size, y - size, arr));
  corners.push(get(x + size, y - size, arr));
  corners.push(get(x - size, y + size, arr));
  corners.push(get(x + size, y + size, arr));
  return cleanse(corners);
};

const column = (y, arr) => (
  (arr[0].length > y || y < 0) ?
    arr.map(row => row[y]) :
    null
);

const corners = (arr) => {
  const cornerCells = [];
  cornerCells.push(get(0, 0, arr));
  cornerCells.push(get(0, arr[0].length - 1, arr));
  cornerCells.push(get(arr.length - 1, 0, arr));
  cornerCells.push(get(arr.length - 1, arr[0].length - 1, arr));
  return cornerCells;
};

const cross = (x, y, arr) => Array.from(new Set([...row(x, arr), ...column(y, arr)]));

const diagonal = (x, y, size, arr) => {
  let diagonalCells = [];
  for (let s = size; s > 0; s--) {
    diagonalCells = [
      ...diagonalCells,
      ...boundingBoxCorners(x, y, s, arr)
    ];
  }
  return diagonalCells;
};

const diamond = (x, y, size, arr) => {
  let diamondCells = [...rowRange(x, y, size, arr)];
  let offset = 1;
  for (let s = size - 1; s >= 0; s--) {
    diamondCells = [
      ...diamondCells,
      ...rowRange(x + offset, y, s, arr),
      ...rowRange(x - offset, y, s, arr)
    ];
    offset++;
  }
  return diamondCells;
};

const neighbours = (x, y, arr) => {
  const copyArr = copy(arr);
  const neighbourCells = [];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (!(i === x && j === y)
        && (typeof copyArr[i] !== 'undefined')
        && (typeof copyArr[i][j] !== 'undefined')) {
        neighbourCells.push(copyArr[i][j]);
      }
    }
  }
  return neighbourCells;
};

const row = (x, arr) => arr[x] || null;

module.exports = {
  area,
  boundingBoxCorners,
  column,
  corners,
  cross,
  diagonal,
  diamond,
  neighbours,
  row
};