import React from 'react';
import {Block, InlineBlock, ResetElement} from 'stylistic-elements';
import Page from '../Page';
import Button from '../Button';
import Link from '../Link';
import Card from '../Card';
import Columns from '../Columns';
import CardText from '../CardText';
import Facts from '../Facts';
import * as Colors from '../Colors';
import * as Spacing from '../Spacing';
import * as Type from '../Type';
import * as Tracking from '../Tracking';

const is2x = 2;

export default class Index extends React.Component {

  trackConversion() {
    Tracking.event('click', 'cta');
  }

  trackHover(question) {
    Tracking.event('hover', `card [${question}]`);
  }

  render() {
    return (
      <Page {...this.props}
        title="Stefano J. Attardi: I am a web [developer, designer]"
        description="I am Stefano J. Attardi, a web developer and designer. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com.">
        <Block textAlign="center" {...Type.antialiased}>
          <InlineBlock
            background="no-repeat center center"
            backgroundSize="131px 131px"
            width={131}
            height={131}
            marginTop={Spacing.h}
            marginBottom={Spacing.m}
            backgroundImage={this.props.assets[is2x ? 'images/pic@2x.jpg' : 'images/pic.jpg']}
          />
          <ResetElement tag="h1" {...Type.xl} letterSpacing={-1} marginBottom={Spacing.m}>Stefano J. Attardi</ResetElement>
          <ResetElement tag="h2" {...Type.m} marginBottom={Spacing.h} paddingBottom={Spacing.h}>
            <CardText
              color="purple"
              question={'I am a web'}
              answers={['developer', 'designer']}
              display="inline-block"
              position="relative"
              whitespace="nowrap"
              autoStart
            />
          </ResetElement>
          <Columns>
            {Facts.map((fact, i) => {
              return (
                <Card
                  key={i}
                  color={fact.color}
                  question={fact.question}
                  space={fact.space}
                  answers={fact.answers}
                  onHover={this.trackHover}
                />
              );
            })}
          </Columns>
          <Block marginTop={Spacing.h} marginBottom={Spacing.h} paddingTop={Spacing.h}>
            <Button onClick={this.trackConversion} href="/email">
              Hire me
            </Button>
          </Block>
          <InlineBlock
            {...Type.s}
            paddingTop={Spacing.h}
            paddingBottom={Spacing.h}
            paddingLeft={Spacing.m}
            paddingRight={Spacing.m}
            marginBottom={Spacing.h}
            color={Colors.lightGray}
            letterSpacing="0.3px"
            maxWidth={480}>
            Site built with {' '}
            <Link href="http://facebook.github.io/react/">React.js</Link>,{' '}
            processed with <Link href="https://webpack.github.io/">Webpack</Link>+<Link href="https://babeljs.io/">Babel</Link>{','} {' '}
            and hosted on <Link href="https://cloud.google.com/appengine/">Google App Engine</Link>.
            The source is <Link href="https://github.com/steadicat/attardi.org">on Github</Link>.
            DNS provided by <Link href="https://www.cloudflare.com/">CloudFlare</Link>.
            SSL certificate from <Link href="https://letsencrypt.org/">Let’s Encrypt</Link>.
            The typeface used is <Link href="http://www.google.com/fonts/specimen/Rubik">Rubik</Link>{','} by <Link href="http://hubertfischer.com/">Hubert & Fischer</Link>.
          </InlineBlock>
        </Block>
      </Page>
    );
  }
}
