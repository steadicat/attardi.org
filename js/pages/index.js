require('babel/polyfill');
import React from "react";
import Page from "../Page";
import Card from "../Card";
import Columns from "../Columns";
import CardText from "../CardText";
import Facts from "../Facts";

export default class Index extends React.Component {

  render() {
    return (
      <Page {...this.props} title="Stefano J. Attardi: I am a web [developer, designer]" description="I am Stefano J. Attardi, a web developer and designer currently working at Storehouse. Previously at Facebook. Winner of the first Node.js Knockout with Swarmation.com.">
        <div className="center aa">
          <div className="pic mbm mth" />
          <h1 className="text-xl tight mbm">Stefano J. Attardi</h1>
          <h2 className="mbh purple text-m">
            <div className="ib rel nowrap">
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
          <div className="mvh pth">
            <a href="https://www.facebook.com/messages/attardi" className="teal teal-border ba ib rounded pvm phl hover-teal-bg hover-white">
              Hire me
            </a>
          </div>
          <div className="text-s pvh phm mbh light-gray loose ib" style={{maxWidth: 360}}>
            Site built with {' '}
            <a href="http://facebook.github.io/react/">React.js</a>,
            packaged with <a href="http://gulpjs.com/">Gulp</a>, {' '}
            and hosted on <a href="http://aws.amazon.com/">S3+CloudFront</a>. The source is <a href="https://github.com/steadicat/attardi.org">on Github</a>.
            DNS provided by <a href="https://www.dnsmadeeasy.com/">DNS Made Easy</a>.
            The typeface used is <a href="http://www.google.com/fonts/specimen/Questrial">Questrial</a>, by <a href="https://dribbble.com/JoePrince">Joe Prince</a>.
          </div>
        </div>
      </Page>
    );
  }
}

if (typeof document !== 'undefined') {
  React.render(<Index js="/js/index.js" />, document);
}
