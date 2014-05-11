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
          <link rel="stylesheet" type="text/css" href="css/main.css" />
        </head>
        <body>
          {this.props.children}
          <script src={'js/' + this.props.module + '.js'} />
        </body>
      </html>
    );
  }
});

module.exports = Page;
