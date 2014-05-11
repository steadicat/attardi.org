/** @jsx React.DOM **/

var React = require('./react');
var Tracking = require('./Tracking');

var Page = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link
            href="http://fonts.googleapis.com/css?family=Questrial" rel="stylesheet" type="text/css"
          />
          <link rel="stylesheet" type="text/css" href="/css/main.css" />
          <link rel="shortcut icon" href="/img/icon.png" type="image/png" />
          <link rel="apple-touch-icon" href="/img/icon.png" />
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
          <meta property="og:site_name" content="Attardi.org" />
          <meta property="og:type" content="website" />
          <meta name="description" content={this.props.description} />
          <meta property="og:url" content={'http://attardi.org/' + (this.props.module !== 'index' ? this.props.module : '')} />
          <meta property="og:title" content={this.props.title} />
          <meta property="og:description" content={this.props.description} />
          <meta property="og:image" content="http://attardi.org/img/card.png" />
        </head>
        <body>
          {this.props.children}
          <script src={'/js/' + this.props.module + '.js'} />
        </body>
      </html>
    );
  }
});

module.exports = Page;
