function size(font, line) {
  return {
    fontSize: `${font}px`,
    lineHeight: `${line}px`,
  };
}

const unit = 8;

export const s = size(12, unit * 3);
export const m = size(28, unit * 4);
export const l = size(32, unit * 4);
export const xl = size(unit * 5, unit * 5);

export const antialiased = {
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};

export const def = {...m, fontFamily: 'Rubik, sans-serif'};
