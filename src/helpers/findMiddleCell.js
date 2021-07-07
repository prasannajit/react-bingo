/**
 * Find the middle cell row and col numbers.
 * This assumes that rowCount and colCount are same.
 * @param  {} rowCount - row count
 * @param  {} colCount - column count
 */
const findMiddleCell = (rowCount, colCount) => {
  const middleCell = (rowCount - 1) / 2;
  return { row: middleCell, col: middleCell };
};

export default findMiddleCell;
