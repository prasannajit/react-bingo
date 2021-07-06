import React from 'react';

const Card = ({ text, row, col, handleClickParent, midCell, selected, partOfBingo }) => {
    const handleClick = () => {
        handleClickParent(row, col);
    };

    let cursor = "pointer";
    let backGroundColor = "#cccccc";
    if (selected) {
        backGroundColor = "green";
    }
    if (partOfBingo) {
        backGroundColor = "yellow";
    }
    if (row === midCell.row && col === midCell.col) {
        cursor = undefined;
        backGroundColor = "red";
    }
    return (
        <p
            style={{ border: "1px solid black", borderRadius: "20px", textAlign: "center", height: "150px", margin: "4px", width: "150px", cursor: `${cursor}`, backgroundColor: `${backGroundColor}` }}
            onClick={cursor === "pointer" ? handleClick : undefined}>
            {text}
        </p>)
}

export default Card;