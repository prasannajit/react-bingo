import React from 'react';
import { isMobile } from 'react-device-detect';
import { initializeCellData } from '../../helpers';
import { COLUMN_COUNT, ROW_COUNT } from '../../constants';

const Bingo = () => {
    const cellData = initializeCellData(ROW_COUNT, COLUMN_COUNT, isMobile);
    console.log(cellData);
    return (
        <div>
            Bingo
        </div>
    )
};

export default Bingo;