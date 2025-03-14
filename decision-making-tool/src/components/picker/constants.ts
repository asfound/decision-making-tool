const DOUBLE = 2;

export const BASE_ANGLES = {
  DEGREES: {
    ZERO: 0,
    QUARTER: 90,
    HALF: 180,
    FULL: 360,
  },

  RADIANS: {
    ZERO: 0,
    HALF: Math.PI,
    FULL: DOUBLE * Math.PI,
  },
};

export const COLOR_RANGE = {
  MIN: 0,
  MAX_RANDOM: 250,
  MAX: 255,
  OFFSET: 1,
};

export const APP_COLORS = {
  PRIMARY: 'rgb(0, 63, 255)',
  WHITE: 'rgb(255, 255, 255)',
};
