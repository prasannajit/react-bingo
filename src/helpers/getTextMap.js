import { DESKTOP_TEXT, MOBILE_TEXT } from '../constants';

/**
 * Get text map which is randomly selected
 * from an array
 * @param  {} rowCount
 * @param  {} colCount
 * @param  {} isMobileOnly
 */
const getTextMap = (rowCount, colCount, isMobileOnly) => {
  const textMap = new Map();
  const alreadyGeneratedIndex = [];
  for (let i = 0; i < rowCount * colCount; i += 1) {
    let random;
    /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
    while (true) {
      random = Math.floor(Math.random() * 25);
      if (!alreadyGeneratedIndex.includes(random)) {
        alreadyGeneratedIndex.push(random);
        break;
      }
    }
    textMap.set(i, isMobileOnly ? MOBILE_TEXT[random] : DESKTOP_TEXT[random]);
  }
  return textMap;
};

export default getTextMap;
