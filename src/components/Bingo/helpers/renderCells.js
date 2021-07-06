import React from 'react';
import Card from '../../Card';
import { findMiddleCell } from "../../../helpers";

const renderCells = (cellData, rowCount, colCount, handleClickParent) => {
    let trArray = [];
    let tdArray = [];
    let midCell = findMiddleCell(rowCount, colCount);
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            tdArray.push(<td key={i + j}><Card midCell={midCell} text={cellData[rowCount * i + j].text} row={i} col={j} handleClickParent={handleClickParent} selected={cellData[rowCount * i + j].selected} partOfBingo={cellData[rowCount * i + j].partOfBingo}></Card></td>)
        }
        trArray.push(<tr key={i}>{tdArray}</tr>);
        tdArray = [];
    }
    return trArray;
};

export default renderCells;