import 'babel/polyfill';
import React from 'react';
import Page from '../Page';
import Button from '../Button';
import Card from '../Card';
import Columns from '../Columns';
import CardText from '../CardText';
import Facts from '../Facts';
import Style from '../Style';
import merge from '../merge';

const wrapperStyle = merge(Style.center, Style.aa);
const picStyle = merge(Style.pic, Style.mbm, Style.mth);
const headlineStyle = merge(Style.inherit, Style.textXL, Style.tight, Style.mbm);
const subtitleWrapperStyle = merge(Style.inherit, Style.mbh, Style.purple, Style.textM);
const subtitleStyle = merge(Style.ib, Style.rel, Style.nowrap);
const footerStyle = merge(Style.mvh, Style.pth);
const colophonStyle = merge(Style.textS, Style.pvh, Style.phm, Style.mbh, Style.lightGray, Style.loose, Style.ib, {maxWidth: 360});
const linkStyle = merge(Style.noUnderline, Style.linkColor);

export default class Index extends React.Component {
  displayName() {
    return 'Index';
  }

  render() {
    return (
      <Page {...this.props} title="Stefano J. Attardi: I am a web [developer, designer]" description="I am Stefano J. Attardi, a web developer and designer. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com.">
        <div style={wrapperStyle}>
          <div style={picStyle} />
          <h1 style={headlineStyle}>Stefano J. Attardi</h1>
          <h2 style={subtitleWrapperStyle}>
            <div style={subtitleStyle}>
              <CardText color="purple" question={'I am a web'} answers={['developer', 'designer']} autoStart={true} />
            </div>
          </h2>
          <Columns>
            {Facts.map(function(fact, i) {
              return (
                <Card
                  key={i}
                  color={fact.color}
                  question={fact.question}
                  space={fact.space}
                  answers={fact.answers}
                />
              );
            })}
          </Columns>
          <div style={footerStyle}>
            <Button href="https://www.facebook.com/messages/attardi">
              Hire me
            </Button>
          </div>
          <div style={colophonStyle}>
            Site built with {' '}
            <a style={linkStyle} href="http://facebook.github.io/react/">React.js</a>{','}
            packaged with <a style={linkStyle} href="http://gulpjs.com/">Gulp</a>{','} {' '}
            and hosted on <a style={linkStyle} href="http://aws.amazon.com/">S3+CloudFront</a>. The source is <a style={linkStyle} href="https://github.com/steadicat/attardi.org">on Github</a>.
            DNS provided by <a style={linkStyle} href="https://www.dnsmadeeasy.com/">DNS Made Easy</a>.
            The typeface used is <a style={linkStyle} href="http://www.google.com/fonts/specimen/Questrial">Questrial</a>{','} by <a style={linkStyle} href="https://dribbble.com/JoePrince">Joe Prince</a>.
          </div>
        </div>
      </Page>
    );
  }
}

if (typeof document !== 'undefined') {
  React.render(<Index js="/js/index.js" />, document);
}
