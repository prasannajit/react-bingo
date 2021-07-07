import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import MD5 from "crypto-js/md5";
import { renderCells } from './helpers';
import { initializeCellData, checkBingo } from '../../helpers';
import { COLUMN_COUNT, ROW_COUNT } from '../../constants';

const Bingo = () => {
    const [cellState, setCellState] = useState(initializeCellData(ROW_COUNT, COLUMN_COUNT, isMobile));
    const [bingoState, setBingoState] = useState({ bingoCells: [], isBingo: false });

    const animate=()=>{
        let height = window.$(window).height();
        let width = window.$(window).width();
        window.$("#bingo-img").show(2000);
        window.$("#bingo-img").effect( "size", { to: {width: width, height: height} }, 1000 );
        window.$("#bingo-img").toggle('explode');
    };
    const handleClickParent = (row, col) => {
        /**Create a copy of state to modify and finally update */
        let updatedCellState = cellState.slice(0);
        /** Update the selected state of the clicked cell */
        let selectedCell = updatedCellState.find((cell) => {
            if (cell.coord.row === row && cell.coord.col === col) {
                return true;
            }
            return false;
        });
        /** toggle selected state */
        selectedCell.selected = !selectedCell.selected;
        /** Update cell state and trigger a re-render */
        setCellState(updatedCellState);

        /** When user clicks on a cell, there are two scenarios that need to be handler
         * We have to check for bingos when a cell is selected, and when a cell is un-selected,
         * we have to update the bing state and re-render the cells.
         */
        if (!selectedCell.selected) {
            /** Reset all the cell's bingo state, based on latest bing cells data
             * update the bingo data of all the cells
             */
            /** Make a copy to work on the state */
            let copyOfCellState = updatedCellState.slice(0);
            for (let i = 0; i < copyOfCellState.length; i++) {
                let cell = copyOfCellState[i];
                if (cell.partOfBingo) {
                    /** reset bing property of a cell */
                    cell.partOfBingo = false;
                }
            }
            const latestBingoCells = checkBingo(updatedCellState, ROW_COUNT, COLUMN_COUNT);
            /** Change bing property based on latest bing data*/
            for (let i = 0; i < latestBingoCells.length; i++) {
                const bingo = latestBingoCells[i];
                for (let j = 0; j < bingo.length; j++) {
                    const bingoCell = bingo[j];
                    let cellInCellState = copyOfCellState.find((cell) => {
                        return (bingoCell.coord.row === cell.coord.row && bingoCell.coord.col === cell.coord.col)
                    });
                    cellInCellState.partOfBingo = true;
                }
            }
            setBingoState({ bingoCells: latestBingoCells, isBingo: false });
            setCellState(copyOfCellState);
        } else {
            /** User has selected a cell */
            let latestBingoCells = checkBingo(updatedCellState, ROW_COUNT, COLUMN_COUNT);

            const md5HashLatestBingoCells = MD5(JSON.stringify(latestBingoCells)).toString();
            const md5HashPreviousBingCells = MD5(JSON.stringify(bingoState.bingoCells)).toString();

            if (md5HashLatestBingoCells !== md5HashPreviousBingCells) {
                /** It's a BINGO */
                const newBingoState = {
                    bingoCells: latestBingoCells,
                    isBingo: true,
                }
                /** set bingo state */
                setBingoState(newBingoState);
                let copyOfCellState = updatedCellState.slice(0);
                for (let i = 0; i < latestBingoCells.length; i++) {
                    const latestBingoCellsArray = latestBingoCells[i];
                    for (let j = 0; j < latestBingoCellsArray.length; j++) {
                        const cellFromBingo = latestBingoCellsArray[j];
                        // find the cell in cell state
                        let bingoCellFromCellState = copyOfCellState.find((cell) => {
                            return (cell.coord.row === cellFromBingo.coord.row && cell.coord.col === cellFromBingo.coord.col)
                        });
                        bingoCellFromCellState.partOfBingo = true;
                    }
                }
                /** Update cell state with updated bingo property */
                setCellState(copyOfCellState);
                animate();
            }
        }
    }

    const cellsElement = renderCells(cellState, ROW_COUNT, COLUMN_COUNT, handleClickParent);

    return (
        <table>
            <tbody>
                {cellsElement}
            </tbody>
        </table>
    );
};

export default Bingo;