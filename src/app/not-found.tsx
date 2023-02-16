import {css} from '@linaria/core';
import * as React from 'react';

import {Title, Subtitle, Button} from '../components/text';
import {unit} from '../design/layout';

const NotFoundPage = React.memo(function NotFoundPage() {
  return (
    <div
      className={css`
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 80vh;
      `}>
      <Title>Not Found</Title>
      <Subtitle
        className={css`
          margin-top: ${unit / 2}px;
          margin-bottom: ${unit * 2}px;
        `}>
        There’s nothing here.
      </Subtitle>
      <Button to="/">Back Home</Button>
    </div>
  );
});

export default NotFoundPage;
