import getTextMap from './getTextMap';
import findMiddleCell from './findMiddleCell';
import { MIDDLE_CELL_TEXT_DESKTOP, MIDDLE_CELL_TEXT_MOBILE } from '../constants';

/**
 * Initialize cell data based on row count and column count.
 * It initialize all the cell data with coordinates and text details.
 * @param  {} rowCount
 * @param  {} colCount
 * @param  {} isMobileOnly
 */
const initializeCellData = (rowCount, colCount, isMobileOnly) => {
  const cellData = [];
  const textMap = getTextMap(rowCount, colCount, isMobileOnly);
  for (let i = 0; i < rowCount; i += 1) {
    for (let j = 0; j < colCount; j += 1) {
      cellData.push({
        coord: { row: i, col: j }, // Coordinate of the cell (row number and column number)
        isSelected: false, // is the cell selected
        isPartOfBingo: false, // is the cell part of any bingo
        text: textMap.get(rowCount * i + j), // the text to be displayed in the cell
      });
    }
  }
  // Middle cell is always selected
  const middleCell = findMiddleCell(rowCount, colCount);
  const midCell = cellData.find((cell) => {
    return cell.coord.row === middleCell.row && cell.coord.col === middleCell.col;
  });
  midCell.isSelected = true;
  midCell.text = isMobileOnly ? MIDDLE_CELL_TEXT_MOBILE : MIDDLE_CELL_TEXT_DESKTOP;
  return cellData;
};

export default initializeCellData;
