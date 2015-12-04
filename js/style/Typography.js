import merge from '../merge';

const Typography = {};
export default Typography;

const unit = 8;

function size(font, line) {
  return {
    fontSize: `${font}px`,
    lineHeight: `${line}px`,
  };
}

Typography.textS = size(12, unit * 3);
Typography.textM = size(28, unit * 4);
Typography.textL = size(32, unit * 4);
Typography.textXL = size(unit * 5, unit * 5);

Typography.tight = {letterSpacing: '-1px'};
Typography.loose = {letterSpacing: '0.3px'};

Typography.default = merge(
  Typography.textM,
  {fontFamily: 'Rubik, sans-serif'}
);

Typography.aa = {
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};
