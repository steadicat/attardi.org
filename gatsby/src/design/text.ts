import {unit} from '../design/layout';

const xl = {fontSize: 36, lineHeight: `${unit * 2.5}px`};
const l = {fontSize: 28, lineHeight: `${unit * 2}px`};
const m = {fontSize: 24, lineHeight: `${unit * 1.5}px`};
const s = {fontSize: 17, lineHeight: `${unit * 1.5}px`};
const xs = {fontSize: 12, lineHeight: `${unit}px`};

// Font variants
export const sans = 'Rubik, sans-serif';
export const serif = '"Zilla Slab", serif';
export const mono = '"Space Mono", monospace';

export const serifRegular = {fontFamily: serif, fontWeight: 400};
const serifMedium = {fontFamily: serif, fontWeight: 500};
export const sansRegular = {fontFamily: sans, fontWeight: 300};
const sansMedium = {fontFamily: sans, fontWeight: 400};
export const sansBold = {fontFamily: sans, fontWeight: 500};
const sansExtraBold = {fontFamily: sans, fontWeight: 600};
const monoRegular = {fontFamily: mono, fontWeight: 400};

export const sansXS = {...sansRegular, ...xs};
export const sansS = {...sansRegular, ...s};
export const sansM = {...sansRegular, ...m};
export const sansBoldXL = {...sansBold, ...xl};
export const sansBoldL = {...sansBold, ...l};
export const sansBoldM = {...sansBold, ...m};
export const sansBoldS = {...sansBold, ...s};
export const sansBoldXS = {...sansBold, ...xs};

export const serifS = {...serifRegular, ...s, fontSize: 19};

export const monoXS = {...monoRegular, ...xs};
export const monoS = {...monoRegular, fontSize: 14};

export const sansCaps = {
  ...sansMedium,
  fontSize: '76%',
  letterSpacing: '1px',
  paddingLeft: '1px',
  paddingRight: '1px',
};
export const sansBoldCaps = {
  ...sansExtraBold,
  fontSize: '76%',
  letterSpacing: '1px',
  paddingLeft: '1px',
  paddingRight: '1px',
};
export const serifCaps = {
  ...serifMedium,
  fontSize: '76%',
  letterSpacing: '1px',
  paddingLeft: '1px',
  paddingRight: '1px',
};
