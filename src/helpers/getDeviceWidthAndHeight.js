/**
 * Provides current device height and width
 * using jQuery
 */
const getDeviceWidthAndHeight = () => {
  const height = window.$(window).height();
  const width = window.$(window).width();
  return {
    width,
    height,
  };
};

export default getDeviceWidthAndHeight;
