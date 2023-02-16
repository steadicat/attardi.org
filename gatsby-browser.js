import * as React from 'react';
import {ProtectedEmailProvider} from './src/protectedEmail';

export const wrapRootElement = ({element}) => (
  <ProtectedEmailProvider
    siteKey={
      process.env.NODE_ENV === 'production'
        ? '0x4AAAAAAACiX56uiMszpvqE'
        : '1x00000000000000000000AA'
    }
    endpoint="/email">
    {element}
  </ProtectedEmailProvider>
);
