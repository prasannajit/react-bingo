import React from 'react';
import { isMobile } from 'react-device-detect';
import { getTextMap } from '../../helpers';
import { COLUMN_COUNT, ROW_COUNT } from '../../constants';

const Bingo = () => {
    const textMap = getTextMap(ROW_COUNT, COLUMN_COUNT, isMobile);
    console.log(textMap);
    return (
        <div>
            Bingo
        </div>
    )
};

export default Bingo;