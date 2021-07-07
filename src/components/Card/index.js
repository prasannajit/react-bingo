import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import {
    BACKGROUND_COLOR_GREEN,
    BACKGROUND_COLOR_TEAL,
    BACKGROUND_COLOR_YELLOW,
    BACKGROUND_COLOR_GREY
} from '../../constants';
/**
 * Returns a React element that displays a provided text
 * @param  {} {text
 * @param  {} row
 * @param  {} col
 * @param  {} handleClickParent
 * @param  {} midCell
 * @param  {} isSelected
 * @param  {} isPartOfBingo}
 */
const Card = ({ text, row, col, handleClickParent, midCell, isSelected, isPartOfBingo }) => {
    const handleClick = () => {
        handleClickParent(row, col);
    };
    let cursor = "pointer";
    let backGroundColor = BACKGROUND_COLOR_GREY;
    if (isSelected) {
        backGroundColor = BACKGROUND_COLOR_GREEN;
    }
    if (isPartOfBingo) {
        backGroundColor = BACKGROUND_COLOR_YELLOW;
    }
    if (row === midCell.row && col === midCell.col) {
        cursor = undefined;
        backGroundColor = BACKGROUND_COLOR_TEAL;
    }
    return (
        <p
            className="card"
            style={{ cursor: `${cursor}`, backgroundColor: `${backGroundColor}` }}
            onClick={cursor === "pointer" ? handleClick : undefined}>
            {text}
        </p>)
};

Card.propTypes = {
    /** Text to be displayed */
    text: PropTypes.string.isRequired,
    /** Row number of the cell */
    row: PropTypes.number.isRequired,
    /** Column number of the cell */
    col: PropTypes.number.isRequired,
    /** Parent method to be triggered when a cell is clicked */
    handleClickParent: PropTypes.func.isRequired,
    /** Middle cell row and column coordinates */
    midCell: PropTypes.object.isRequired,
    /** The cell should be selected or not */
    isSelected: PropTypes.bool.isRequired,
    /** The cell should be part of Bingo or not */
    isPartOfBingo: PropTypes.bool.isRequired,
}
export default Card;