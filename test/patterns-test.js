const patterns = require('../src/patterns');

describe('Patterns', () => {
  const test3x3 = (() => [
    [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
    [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
    [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }]
  ]);

  const test5x5 = (() => [
    [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }, { name: '0:3' }, { name: '0:4' }],
    [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }, { name: '1:3' }, { name: '1:4' }],
    [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }, { name: '2:3' }, { name: '2:4' }],
    [{ name: '3:0' }, { name: '3:1' }, { name: '3:2' }, { name: '3:3' }, { name: '3:4' }],
    [{ name: '4:0' }, { name: '4:1' }, { name: '4:2' }, { name: '4:3' }, { name: '4:4' }]
  ]);

  describe('2dArray.area', () => {
    test('should get square area around cell', () => {
      const expectedResult1 = [
        [{ name: '1:1' }, { name: '1:2' }, { name: '1:3' }],
        [{ name: '2:1' }, { name: '2:2' }, { name: '2:3' }],
        [{ name: '3:1' }, { name: '3:2' }, { name: '3:3' }]
      ];
      const expectedResult2 = [
        [{ name: '0:0' }, { name: '0:1' }],
        [{ name: '1:0' }, { name: '1:1' }]
      ];
      const expectedResult3 = [
        [{ name: '2:2' }, { name: '2:3' }, { name: '2:4' }],
        [{ name: '3:2' }, { name: '3:3' }, { name: '3:4' }],
        [{ name: '4:2' }, { name: '4:3' }, { name: '4:4' }]
      ];
      expect(patterns.area(2, 2, 1, test5x5())).toEqual(expectedResult1);
      expect(patterns.area(0, 0, 1, test5x5())).toEqual(expectedResult2);
      expect(patterns.area(4, 4, 2, test5x5())).toEqual(expectedResult3);
    });
  });

  describe('2dArray.boundingBoxCorners', () => {
    test('should get array of corner cells of a bounding box', () => {
      const expected = [{ name: '1:1' }];
      expect(patterns.boundingBoxCorners(0, 0, 1, test3x3())).toEqual(expected);

      const expected2 = [{ name: '0:2' }, { name: '4:2' }];
      expect(patterns.boundingBoxCorners(2, 0, 2, test5x5())).toEqual(expected2);

      expect(patterns.boundingBoxCorners(2, 2, 5, test5x5())).toEqual([]);
    });
  });

  describe('2dArray.column', () => {
    test('should get cells in same column', () => {
      const expectedResult = [{ name: '0:2' }, { name: '1:2' }, { name: '2:2' }];
      expect(patterns.column(2, test3x3())).toEqual(expectedResult);
      expect(patterns.column(3, test3x3())).toEqual(null);
    });
  });

  // describe('2dArray.cone', () => {
  //   test('should get an expanding cone of cells from a given coordinate', () => {
  //   });
  // });

  describe('2dArray.corners', () => {
    test('should get array of corner cells', () => {
      const expected = [{ name: '0:0' }, { name: '0:2' }, { name: '2:0' }, { name: '2:2' }];
      expect(patterns.corners(test3x3())).toEqual(expected);
    });
  });

  describe('2dArray.cross', () => {
    test('should get an array of column and row from cell', () => {
      const expected = [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }, { name: '0:1' }, { name: '2:1' }];
      expect(patterns.cross(1, 1, test3x3())).toEqual(expected);
    });
  });

  describe('2dArray.diagonal', () => {
    test('should get an array of diagonal cells', () => {
      const expected1 = [{ name: '0:0' }, { name: '2:0' }, { name: '0:2' }, { name: '2:2' }];
      const result1 = patterns.diagonal(1, 1, 1, test3x3());
      expect(result1).toEqual(expected1);

      const expected2 = [{ name: '0:2' }, { name: '1:1' }];
      const result2 = patterns.diagonal(2, 0, 2, test3x3());
      expect(result2).toEqual(expected2);

      const expected3 = [{ 'name': '0:2' }, { 'name': '4:2' }, { 'name': '1:1' }, { 'name': '3:1' }];
      const result3 = patterns.diagonal(2, 0, 2, test5x5());
      expect(result3).toEqual(expected3);
    });
  });

  describe('2dArray.diamond', () => {
    test('should get a diamond of cells', () => {
      const expected = [{ 'name': '1:0' }, { 'name': '1:1' }, { 'name': '1:2' }, { 'name': '2:1' }, { 'name': '0:1' }];
      expect(patterns.diamond(1, 1, 1, test3x3())).toEqual(expected);

      const expected2 = [{ 'name': '0:0' }, { 'name': '0:1' }, { 'name': '1:0' }];
      expect(patterns.diamond(0, 0, 1, test3x3())).toEqual(expected2);
    });
  });

  describe('2dArray.neighbours', () => {
    test('should get neighbouring cells (including diagonal)', () => {
      const expectedResult1 = [{ name: '0:1' }, { name: '1:0' }, { name: '1:1' }];
      const expectedResult2 = [
        { name: '0:0' }, { name: '0:1' }, { name: '0:2' }, 
        { name: '1:0' }, { name: '1:2' },
        { name: '2:0' }, { name: '2:1' }, { name: '2:2' }];
      const expectedResult3 = [{ name: '1:1' }, { name: '1:2' }, { name: '2:1' }];
      expect(patterns.neighbours(1, 1, test3x3())).toEqual(expectedResult2);
      expect(patterns.neighbours(0, 0, test3x3())).toEqual(expectedResult1);
      expect(patterns.neighbours(2, 2, test3x3())).toEqual(expectedResult3);
    });
  });

  describe('2dArray.row', () => {
    test('should get cells in same row', () => {
      const expectedResult = [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }];
      expect(patterns.row(1, test3x3())).toEqual(expectedResult);
      expect(patterns.row(4, test3x3())).toEqual(null);
    });
  });
});