const operations = require('../src/operations');

describe('Operations', () => {
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

  describe('Row operations', () => {
    describe('2dArray.rowRange', () => {
      test('should get cells of a row in a range between columns', () => {
        const expected = [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }, { name: '0:3' }];
        expect(operations.rowRange(0, 0, 3, test5x5())).toEqual(expected);

        const expected2 = [{ name: '2:1' }, { name: '2:2' }, { name: '2:3' }];
        expect(operations.rowRange(2, 2, 1, test5x5())).toEqual(expected2);

        const expected3 = [{ name: '4:2' }, { name: '4:3' }, { name: '4:4' }];
        expect(operations.rowRange(4, 4, 2, test5x5())).toEqual(expected3);
      });
    });

    describe('2dArray.rowShift', () => {
      test('should remove the first row of an array', () => {
        const expected = [
          [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
          [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }]
        ];
        expect(operations.rowShift(test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.rowPop', () => {
      test('should remove the last row of an array', () => {
        const expected = [
          [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
          [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }]
        ];
        expect(operations.rowPop(test3x3())).toEqual(expected);
      });
    });

    describe('operations.rowAppend', () => {
      test('should append a row to a given array', () => {
        const expected = [
          [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
          [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
          [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }],
          [{ name: '3:0' }, { name: '3:1' }, { name: '3:2' }]
        ];
        const given = [{ name: '3:0' }, { name: '3:1' }, { name: '3:2' }];
        expect(operations.rowAppend(given, test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.rowPrepend', () => {
      test('should add a row at index 0', () => {
        const expected = [
          [{ name: '3:0' }, { name: '3:1' }, { name: '3:2' }],
          [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
          [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
          [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }]
        ];
        const given = [{ name: '3:0' }, { name: '3:1' }, { name: '3:2' }];
        expect(operations.rowPrepend(given, test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.rowInsert', () => {
      test('should insert a row into an array at a given index', () => {
        const expected = [
          [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
          [{ name: 'zero' }, { name: 'one' }, { name: 'two' }],
          [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
          [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }]
        ];
        const given = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }];
        expect(operations.rowInsert(given, 1, test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.rowReplace', () => {
      test('should replace a row in an array with a given row', () => {
        const expected = [
          [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
          [{ name: '3:0' }, { name: '3:1' }, { name: '3:2' }],
          [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }]
        ];
        const given = [{ name: '3:0' }, { name: '3:1' }, { name: '3:2' }];
        expect(operations.rowReplace(given, 1, test3x3())).toEqual(expected);
      });
    });
  });

  describe('Column operations', () => {

    describe('2dArray.columnShift', () => {
      test('should remove the first column of an array', () => {
        const expected = [
          [{ name: '0:1' }, { name: '0:2' }],
          [{ name: '1:1' }, { name: '1:2' }],
          [{ name: '2:1' }, { name: '2:2' }],
        ];
        expect(operations.columnShift(test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.columnPop', () => {
      test('should remove the last column of an array', () => {
        const expected = [
          [{ name: '0:0' }, { name: '0:1' }],
          [{ name: '1:0' }, { name: '1:1' }],
          [{ name: '2:0' }, { name: '2:1' }],
        ];
        expect(operations.columnPop(test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.columnAppend', () => {
      test('should append a column to a given array', () => {
        const expected = [
          [{ name: '0:0' }, { name: '0:1' }, { name: '0:2' }, { name: '0:3' }],
          [{ name: '1:0' }, { name: '1:1' }, { name: '1:2' }, { name: '1:3' }],
          [{ name: '2:0' }, { name: '2:1' }, { name: '2:2' }, { name: '2:3' }]
        ];
        const given = [{ name: '0:3' }, { name: '1:3' }, { name: '2:3' }];
        expect(operations.columnAppend(given, test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.columnPrepend', () => {
      test('should add a column at index 0', () => {
        const expected = [
          [{ name: 'zero' }, { name: '0:0' }, { name: '0:1' }, { name: '0:2' }],
          [{ name: 'one' }, { name: '1:0' }, { name: '1:1' }, { name: '1:2' }],
          [{ name: 'two' }, { name: '2:0' }, { name: '2:1' }, { name: '2:2' }]
        ];
        const given = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }];
        expect(operations.columnPrepend(given, test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.columnInsert', () => {
      test('should insert a column into an array at a given index', () => {
        const expected = [
          [{ name: '0:0' }, { name: '0:1' }, { name: 'zero' }, { name: '0:2' }],
          [{ name: '1:0' }, { name: '1:1' }, { name: 'one' }, { name: '1:2' }],
          [{ name: '2:0' }, { name: '2:1' }, { name: 'two' }, { name: '2:2' }]
        ];
        const given = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }];
        expect(operations.columnInsert(given, 2, test3x3())).toEqual(expected);
      });
    });

    describe('2dArray.columnReplace', () => {
      test('should replace a column in an array with a given column', () => {
        const expected = [
          [{ name: '0:0' }, { name: 'zero' }, { name: '0:2' }],
          [{ name: '1:0' }, { name: 'one' }, { name: '1:2' }],
          [{ name: '2:0' }, { name: 'two' }, { name: '2:2' }]
        ];
        const given = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }];
        expect(operations.columnReplace(given, 1, test3x3())).toEqual(expected);
      });
    });
    // describe('2dArray.columnRange', () => {
    //   test('should get cells of a column in a range between rows', () => {
    //   });
    // });
  });
});
