import getTextMap from "./getTextMap";
import findMiddleCell from "./findMiddleCell";
import { MIDDLE_CELL_TEXT_DESKTOP, MIDDLE_CELL_TEXT_MOBILE } from '../constants/';

/**
 * Initialize cell data based on row count and column count.
 * It initialize all the cell data with coordinates and text details.
 * @param  {} rowCount
 * @param  {} colCount
 * @param  {} isMobile
 */
const initializeCellData = (rowCount, colCount, isMobile) => {
    let cellData = [];
    const textMap = getTextMap(rowCount, colCount, false);
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            cellData.push({
                coord: { row: i, col: j }, // Coordinate of the cell (row number and column number)
                selected: false, // is the cell selected
                partOfBingo: false, // is the cell part of any bingo
                text: textMap.get(rowCount * i + j) // the text to be displayed in the cell
            });
        }
    }
    // Middle cell is always selected
    let middleCell = findMiddleCell(rowCount, colCount);
    let midCell = cellData.find((cell) => {
        return (cell.coord.row === middleCell.row && cell.coord.col === middleCell.col);
    });
    midCell.selected = true;
    // midCell.text = isMobile ? MIDDLE_CELL_TEXT_MOBILE : MIDDLE_CELL_TEXT_DESKTOP;
    midCell.text = MIDDLE_CELL_TEXT_DESKTOP;
    return cellData;
};

export default initializeCellData;