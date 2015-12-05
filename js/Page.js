import React from 'react';
import {ResetElement} from 'stylistic-elements';
import * as Tracking from './Tracking';
import * as Type from './Type';

const LOCAL_ASSETS = (process.env.NODE_ENV !== 'production') || (process.env.LOCAL_ASSETS === 'true');

export default class Page extends React.Component {
  componentDidMount() {
    Tracking.init();
  }

  render() {
    const {title, description, path, assets, children} = this.props;
    return (
      <html>
        <head>
          <title>{title}</title>
          <link
            href="//fonts.googleapis.com/css?family=Rubik" rel="stylesheet" type="text/css"
          />
          <link rel="shortcut icon" href={assets['images/icon.png']} type="image/png" />
          <link rel="apple-touch-icon" href={assets['images/icon.png']} />
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
          <meta property="og:site_name" content="Attardi.org" />
          <meta property="og:type" content="website" />
          <meta name="description" content={description} />
          <meta property="og:url" content={'https://attardi.org/'} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={`https://attardi.org${assets['images/card.jpg']}`} />
        </head>
        <ResetElement tag="body" color="#000" {...Type.def}>
          {children}
          <script src={LOCAL_ASSETS ? 'http://localhost:8081/main.js' : '/' + assets['main.js']} />
          <script dangerouslySetInnerHTML={{__html: `Attardi.init(${inlineJSON(path)}, ${inlineJSON(assets)})`}} />
        </ResetElement>
      </html>
    );
  }
}

function inlineJSON(data) {
  return JSON.stringify(data)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/<\//g, '<\\/');
}
