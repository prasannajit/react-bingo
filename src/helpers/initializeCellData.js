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
    const textMap = getTextMap(rowCount, colCount);
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            cellData.push({
                coord: { row: i, col: j },
                selected: false,
                partOfBingo: false,
                text: textMap.get(rowCount * i + j)
            });
        }
    }
    // Middle cell is always selected
    let middleCell = findMiddleCell(rowCount, colCount);
    let midCell = cellData.find((cell) => {
        return (cell.coord.row === middleCell.row && cell.coord.col === middleCell.col);
    });
    midCell.selected = true;
    midCell.text = isMobile ? MIDDLE_CELL_TEXT_MOBILE : MIDDLE_CELL_TEXT_DESKTOP;
    return cellData;
};

export default initializeCellData;