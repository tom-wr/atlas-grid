const { copy, zeroLatch, negativeLatch } = require('./utils');

const columnAppend = (newColumn, arr) => {
  const arrCopy = copy(arr);
  return arrCopy.map((row, index) => { row[row.length] = newColumn[index]; return row; });
};

const columnInsert = (newColumn, index, arr) => {
  const arrCopy = copy(arr);
  return arrCopy.map((row, rowCount) => {
    const rowFormer = row.splice(0, index);
    return [...rowFormer, newColumn[rowCount], ...row];
  });
};

const columnPop = (arr) => {
  const arrCopy = copy(arr);
  return arrCopy.map(row => row.splice(0, row.length - 1));
};

const columnPrepend = (newColumn, arr) => {
  const arrCopy = copy(arr);
  return arrCopy.map((row, index) => { row.unshift(newColumn[index]); return row; });
};

const columnReplace = (newColumn, index, arr) => {
  const arrCopy = copy(arr);
  return arrCopy.map((row, rowIndex) => {
    row[index] = newColumn[rowIndex];
    return row;
  });
};

const columnShift = (arr) => {
  const arrCopy = copy(arr);
  return arrCopy.map(row => row.splice(1, row.length - 1));
};

const rowAppend = (newRow, arr) => {
  const arrCopy = copy(arr);
  arrCopy[arrCopy.length] = newRow;
  return arrCopy;
};

const rowInsert = (newRow, index, arr) => {
  const arrCopy = copy(arr);
  const former = arrCopy.splice(0, index);
  return [...former, newRow, ...arrCopy];
};

const rowPop = (arr) => {
  const arrCopy = copy(arr);
  arrCopy.pop();
  return arrCopy;
};

const rowRange = (x, y, size, arr) => {
  try {
    const r = [...arr[x]];
    return r.splice(zeroLatch(y - size), negativeLatch(y - size) + (2 * size + 1));
  }
  catch (error) {
    return [];
  }
};

const rowReplace = (newRow, index, arr) => {
  const arrCopy = copy(arr);
  arrCopy[index] = newRow;
  return arrCopy;
};

const rowPrepend = (newRow, arr) => {
  const arrCopy = copy(arr);
  arrCopy.unshift(newRow);
  return arrCopy;
};

const rowShift = (arr) => {
  const arrCopy = copy(arr);
  arrCopy.shift();
  return arrCopy;
};

module.exports = {
  columnAppend,
  columnInsert,
  columnPop,
  columnPrepend,
  columnReplace,
  columnShift,
  rowAppend,
  rowInsert,
  rowPop,
  rowPrepend,
  rowRange,
  rowReplace,
  rowShift,
};