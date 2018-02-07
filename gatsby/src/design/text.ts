import {unit} from '../design/layout';

export const xl = {fontSize: 36, lineHeight: `${unit * 2}px`};
export const l = {fontSize: 28, lineHeight: `${unit * 2}px`};
export const m = {fontSize: 22, lineHeight: `${unit * 1.5}px`};
export const s = {fontSize: 18, lineHeight: `${unit * 1.5}px`};
export const xs = {fontSize: 12, lineHeight: `${unit}px`};

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
export const sansM = {...sansRegular, ...m};
export const serifS = {...serifRegular, ...s};

export const sansBoldXL = {...sansBold, ...xl};
export const sansBoldL = {...sansBold, ...l};
export const sansBoldM = {...sansBold, ...m};
export const sansBoldS = {...sansBold, ...s};
export const sansBoldXS = {...sansBold, ...xs};

export const monoXS = {...monoRegular, ...xs};

export const sansCaps = {
  ...sansMedium,
  fontSize: '76%',
  letterSpacing: '1px',
};
export const sansBoldCaps = {
  ...sansExtraBold,
  fontSize: '76%',
  letterSpacing: '1px',
};
export const serifCaps = {
  ...serifMedium,
  fontSize: '76%',
  letterSpacing: '1px',
};
