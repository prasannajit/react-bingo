/**
 * Check if all the cells of a row is selected or not, then
 * send list of those rows
 * @param  {} cellData
 * @param  {} rowCount
 */
const checkRowBingo = (cellData, rowCount) => {
    /** Find all the cells that are selected */
    let selectedCells = cellData.filter(cell => cell.isSelected);
    let result = [];
    if (selectedCells.length < rowCount) {
        return result;
    }
    for (let row = 0; row < rowCount; row++) {
        /** Find all the cells that are on the same row */
        let selectedCellsWithSameRow = selectedCells.filter(cell => cell.coord.row === row);
        /** If all the cells of a row are selected then its a row bingo */
        if (selectedCellsWithSameRow.length === rowCount) {
            result.push(selectedCellsWithSameRow.sort((cell1, cell2) => cell1.coord.row - cell2.coord.row));
        }
    }
    return result;
}
/**
 * Check if all the cells of a column is selected or not, then
 * send list of those column
 * @param  {} cellData
 * @param  {} colCount
 */
const checkColBingo = (cellData, colCount) => {
    /** Find all the cells that are selected */
    let selectedCells = cellData.filter(cell => cell.isSelected);
    let result = [];
    if (selectedCells.length < colCount) {
        return result;
    }
    for (let col = 0; col < colCount; col++) {
        /** Find all the cells that are on the same column */
        let selectedCellsWithSameCol = selectedCells.filter(cell => cell.coord.col === col);
        /** If all the cells of a column are selected then its a row bingo */
        if (selectedCellsWithSameCol.length === colCount) {
            result.push(selectedCellsWithSameCol.sort((cell1, cell2) => cell1.coord.row - cell2.coord.row));
        }
    }
    return result;
}

/**
 * Check if all the cells of a diagonal are selected
 * @param  {} cellData
 * @param  {} rowCount
 * @param  {} colCount
 */
const checkDiagonalBingo = (cellData, rowCount, colCount) => {
    /** Check if it is part of straight diagonal */
    const partOf1stDiagonal = (cell) => {
        if (cell.coord.row === cell.coord.col) {
            return true;
        }
    };
    /** Check if it is part of reverse diagonal */
    const partOf2ndDiagonal = (cell) => {
        if (cell.coord.row === rowCount - cell.coord.col - 1) {
            return true;
        }
    };
    /** Find all the cells that are selected */
    let selectedCells = cellData.filter(cell => cell.isSelected);
    let result = [];
    if (selectedCells.length < colCount) {
        return result;
    }
    /** Find all the diagonal cells */
    const firstDiagCells = selectedCells.filter(partOf1stDiagonal);
    const secondDiagCells = selectedCells.filter(partOf2ndDiagonal);
    /** Check if all diagonal cells are selected */
    if (firstDiagCells.length === rowCount) {
        result.push(firstDiagCells.sort((cell1, cell2) => cell1.coord.row - cell2.coord.row));
    }
    if (secondDiagCells.length === rowCount) {
        result.push(secondDiagCells.sort((cell1, cell2) => cell1.coord.row - cell2.coord.row));
    }
    return result;
};

/**
 * Check all the row bingos, column bingos and diagonal bingos
 * @param  {} cellData
 * @param  {} rowCount
 * @param  {} colCount
 */
const checkBingo = (cellData, rowCount, colCount) => {
    return [...checkRowBingo(cellData, rowCount), ...checkColBingo(cellData, rowCount), ...checkDiagonalBingo(cellData, rowCount, colCount)];
};

export default checkBingo;