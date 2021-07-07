import React from 'react';
import Card from '../../Card';
import { findMiddleCell } from "../../../helpers";

/**
 * Return a list of react table row elements which 
 * internally contains a set of data elements
 * @param  {} cellData
 * @param  {} rowCount
 * @param  {} colCount
 * @param  {} handleClickParent
 */
const renderCells = (cellData, rowCount, colCount, handleClickParent) => {
    let trArray = [];
    let tdArray = [];
    let midCell = findMiddleCell(rowCount, colCount);
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            tdArray.push(<td key={i + j}><Card midCell={midCell} text={cellData[rowCount * i + j].text} row={i} col={j} handleClickParent={handleClickParent} isSelected={cellData[rowCount * i + j].isSelected} isPartOfBingo={cellData[rowCount * i + j].isPartOfBingo}></Card></td>)
        }
        trArray.push(<tr key={i}>{tdArray}</tr>);
        tdArray = [];
    }
    return trArray;
};

export default renderCells;