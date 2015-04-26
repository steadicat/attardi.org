import React from 'react';
import Tracking from './Tracking';
import Style from './Style';

export default class Page extends React.Component {
  componentDidMount() {
    Tracking.init();
  }

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link
            href="http://fonts.googleapis.com/css?family=Questrial" rel="stylesheet" type="text/css"
          />
          <link rel="shortcut icon" href="/img/icon.png" type="image/png" />
          <link rel="apple-touch-icon" href="/img/icon.png" />
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
          <meta property="og:site_name" content="Attardi.org" />
          <meta property="og:type" content="website" />
          <meta name="description" content={this.props.description} />
          <meta property="og:url" content={'http://attardi.org/'} />
          <meta property="og:title" content={this.props.title} />
          <meta property="og:description" content={this.props.description} />
          <meta property="og:image" content="http://attardi.org/img/card.png" />
        </head>
        <body style={Style.default}>
          {this.props.children}
          <script src="/js/common.js" />
          <script src={this.props.js} />
        </body>
      </html>
    );
  }
}
