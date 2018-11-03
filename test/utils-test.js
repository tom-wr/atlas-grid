const utils = require('../src/utils');

describe('Utils', () => {
  const test3x3 = (() => [
    [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
    [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
    [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }]
  ]);

  describe('2dArray.create', () => {

    test('should create 2d array', () => {
      const expected = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];
      expect(utils.create(3, 3, () => 1)).toEqual(expected);
    });

    test('should create 2d array of null cells if no populate function', () => {
      const expected = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
      expect(utils.create(3, 3)).toEqual(expected);
    });

    test('should create 2d array calculations by using population arguments', () => {
      const expected = [
        ['0:0', '0:1', '0:2'],
        ['1:0', '1:1', '1:2'],
        ['2:0', '2:1', '2:2']
      ];
      expect(utils.create(3, 3, (row, col) => `${row}:${col}`)).toEqual(expected);
    });
  });

  describe('2dArray.cleanse', () => {
    test('should remove null and undefined from array', () => {
      const given = ['yes', null, 'maybe', 'repeat the question'];
      const expected = ['yes', 'maybe', 'repeat the question'];
      expect(utils.cleanse(given)).toEqual(expected);
    });
  });

  describe('2dArray.copy', () => {
    test('should get a diamond of cells', () => {
      const expected = [
        [{ foo: { bar: { baz: 'one' } } }, { foo: { bar: { baz: 'two' } } }],
        [{ foo: { bar: { baz: 'three' } } }, { foo: { bar: { baz: 'four' } } }]
      ];

      const given = [
        [{ foo: { bar: { baz: 'one' } } }, { foo: { bar: { baz: 'two' } } }],
        [{ foo: { bar: { baz: 'three' } } }, { foo: { bar: { baz: 'four' } } }]
      ];
      expect(utils.copy(given)).toEqual(expected);
    });
  });

  describe('2dArray.get', () => {
    test('should get cell', () => {
      expect(utils.get(0, 0, test3x3())).toEqual({ name: '0:0' });
      expect(utils.get(1, 1, test3x3())).toEqual({ name: '1:1' });
      expect(utils.get(2, 1, test3x3())).toEqual({ name: '2:1' });
      expect(utils.get(3, 1, test3x3())).toEqual(null);
    });
  });

  describe('2dArray.set', () => {
    test('should set cell', () => {
      const expected3x3 = [
        [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
        [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
        [{ name: '2:0' }, { name: '2:1' }, { name: 'sausage' }]
      ];
      expect(utils.set(2, 2, { name: 'sausage' }, test3x3())).toEqual(expected3x3);
      expect(utils.set(3, 1, { name: 'sausage' }, test3x3())).toEqual(null);
    });
  });

  describe('2dArray.exists', () => {
    test('should return true if a cell exists', () => {
      expect(utils.exists(1, 1, test3x3())).toEqual(true);
    });
    test('should return false if a cell does not exist', () => {
      expect(utils.exists(4, 4, test3x3())).toEqual(false);
    });
  });
});