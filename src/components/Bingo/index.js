import React, { useState } from 'react';
// import { isMobileOnly } from 'react-device-detect';
import MD5 from 'crypto-js/md5';
import renderCells from './helpers/renderCells';
import initializeCellData from '../../helpers/initializeCellData';
import checkBingo from '../../helpers/checkBingo';
import getDeviceWidthAndHeight from '../../helpers/getDeviceWidthAndHeight';
import { COLUMN_COUNT, ROW_COUNT, MOBILE_DEVICE_MAX_WIDTH } from '../../constants';

/**
 * Return a React element that shows a table
 */
const Bingo = () => {
  const { width } = getDeviceWidthAndHeight();
  let isMobileOnly = false;
  if (width <= MOBILE_DEVICE_MAX_WIDTH) {
    isMobileOnly = true;
  }
  const [cellState, setCellState] = useState(initializeCellData(ROW_COUNT, COLUMN_COUNT, isMobileOnly));
  const [bingoState, setBingoState] = useState({ bingoCells: [], isBingo: false });
  /**
   * Shows a image and performs some animation
   * using Jquery
   */
  const animate = () => {
    const { width: viewPortWidth, height: viewPortHeight } = getDeviceWidthAndHeight();
    window.$('#bingo-img').show(2000);
    window.$('#bingo-img').effect('size', { to: { width: viewPortWidth, height: viewPortHeight } }, 1000);
    window.$('#bingo-img').toggle('explode');
  };

  /**
   * Click handler on card component, received inside the parent.
   * This method takes care of re-rendering the entire page
   * 1) When a cell is selected it checks if Bingo has happened
   * 2) When a cell is deselected it checks to remove bingo cells
   * 3) Triggers an animation when Bingo happens
   * @param  {} row
   * @param  {} col
   */
  const handleClickParent = (row, col) => {
    /** Create a copy of state to modify and finally update */
    const updatedCellState = cellState.slice(0);
    /** Update the isSelected state of the clicked cell */
    const selectedCell = updatedCellState.find((cell) => {
      if (cell.coord.row === row && cell.coord.col === col) {
        return true;
      }
      return false;
    });
    /** toggle isSelected state */
    selectedCell.isSelected = !selectedCell.isSelected;
    /** Update cell state and trigger a re-render */
    setCellState(updatedCellState);

    /** When user clicks on a cell, there are two scenarios that need to be handler
     * We have to check for bingos when a cell is selected, and when a cell is un-selected,
     * we have to update the bing state and re-render the cells.
     */
    if (!selectedCell.isSelected) {
      /** Reset all the cell's bingo state, based on latest bing cells data
       * update the bingo data of all the cells
       */
      /** Make a copy to work on the state */
      const copyOfCellState = updatedCellState.slice(0);
      for (let i = 0; i < copyOfCellState.length; i += 1) {
        const cell = copyOfCellState[i];
        if (cell.isPartOfBingo) {
          /** reset bing property of a cell */
          cell.isPartOfBingo = false;
        }
      }
      const latestBingoCells = checkBingo(updatedCellState, ROW_COUNT, COLUMN_COUNT);
      /** Change bing property based on latest bing data */
      for (let i = 0; i < latestBingoCells.length; i += 1) {
        const bingo = latestBingoCells[i];
        for (let j = 0; j < bingo.length; j += 1) {
          const bingoCell = bingo[j];
          const cellInCellState = copyOfCellState.find((cell) => {
            return bingoCell.coord.row === cell.coord.row && bingoCell.coord.col === cell.coord.col;
          });
          cellInCellState.isPartOfBingo = true;
        }
      }
      setBingoState({ bingoCells: latestBingoCells, isBingo: false });
      setCellState(copyOfCellState);
    } else {
      /** User has selected a cell */
      const latestBingoCells = checkBingo(updatedCellState, ROW_COUNT, COLUMN_COUNT);

      const md5HashLatestBingoCells = MD5(JSON.stringify(latestBingoCells)).toString();
      const md5HashPreviousBingCells = MD5(JSON.stringify(bingoState.bingoCells)).toString();

      if (md5HashLatestBingoCells !== md5HashPreviousBingCells) {
        /** It's a BINGO */
        const newBingoState = {
          bingoCells: latestBingoCells,
          isBingo: true,
        };
        /** set bingo state */
        setBingoState(newBingoState);
        const copyOfCellState = updatedCellState.slice(0);
        for (let i = 0; i < latestBingoCells.length; i += 1) {
          const latestBingoCellsArray = latestBingoCells[i];
          for (let j = 0; j < latestBingoCellsArray.length; j += 1) {
            const cellFromBingo = latestBingoCellsArray[j];
            // find the cell in cell state
            const bingoCellFromCellState = copyOfCellState.find((cell) => {
              return cell.coord.row === cellFromBingo.coord.row && cell.coord.col === cellFromBingo.coord.col;
            });
            bingoCellFromCellState.isPartOfBingo = true;
          }
        }
        /** Update cell state with updated bingo property */
        setCellState(copyOfCellState);
        animate();
      }
    }
  };

  const cellsElement = renderCells(cellState, ROW_COUNT, COLUMN_COUNT, handleClickParent);

  return (
    <table>
      <tbody>{cellsElement}</tbody>
    </table>
  );
};

export default Bingo;
