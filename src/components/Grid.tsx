import {css} from '@linaria/core';
import * as React from 'react';

import {linkColor} from '../design/colors';
import {unit} from '../design/layout';

const Grid = React.memo(function Grid() {
  return (
    <svg
      className={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        transform: translateZ(0);
      `}>
      <defs>
        <pattern id="grid" x="0" y="0" width={unit} height={unit} patternUnits="userSpaceOnUse">
          <rect
            x="-0.5"
            y="-0.5"
            width={unit}
            height={unit}
            stroke={linkColor}
            fill="none"
            opacity="0.2"
            patternUnits="userSpaceOnUse"
          />
        </pattern>
      </defs>
      <rect fill={`url(${window.location}#grid)`} x="0" y="0" width="100%" height="100%" />
    </svg>
  );
});

export default Grid;
