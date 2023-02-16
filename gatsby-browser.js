import * as React from 'react';
import {ProtectedEmailProvider} from './src/protectedEmail';

export const wrapRootElement = ({element}) => (
  <ProtectedEmailProvider siteKey="0x4AAAAAAACiX56uiMszpvqE" endpoint="/email">
    {element}
  </ProtectedEmailProvider>
);
