import React from 'react';
import './Card.css';
import {
    BACKGROUND_COLOR_GREEN,
    BACKGROUND_COLOR_TEAL,
    BACKGROUND_COLOR_YELLOW,
    BACKGROUND_COLOR_GREY
} from '../../constants';

const Card = ({ text, row, col, handleClickParent, midCell, selected, partOfBingo }) => {
    const handleClick = () => {
        handleClickParent(row, col);
    };
    let cursor = "pointer";
    let backGroundColor = BACKGROUND_COLOR_GREY;
    if (selected) {
        backGroundColor = BACKGROUND_COLOR_GREEN;
    }
    if (partOfBingo) {
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
}

export default Card;