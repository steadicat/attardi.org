import {css} from '@linaria/core';
import fs from 'fs';
import path from 'path';
import * as React from 'react';

import {EmailButton, EmailLink} from '@/components/Email';
import {DateView, Heading, Link, Subheading, Subtitle, Title} from '@/components/text';
import {accentColor, gray} from '@/design/colors';
import {unit} from '@/design/layout';
import {sansBoldS, sansCaps, sansM, sansXS} from '@/design/text';

import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Stefano J. Attardi: Engineering Manager',
  description:
    'Engineering Manager at Coinbase. Former UI engineer and designer, specializing in React and React performance. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com.',
};

const NewTag = React.memo(function NewTag() {
  return (
    <span
      className={css`
        ${sansXS};
        color: ${accentColor};
        border: 1px solid ${accentColor};
        border-radius: 3px;
        padding: 0 4px 1px 5px;
        vertical-align: middle;
      `}>
      <span
        className={css`
          ${sansCaps}
        `}>
        NEW
      </span>
    </span>
  );
});

const ProjectRow = React.memo(function ProjectRow({
  url,
  title,
  description,
  isNew = false,
}: {
  url: string;
  title: string;
  description: string;
  isNew?: boolean;
}) {
  return (
    <>
      <Subheading
        key={url}
        className={css`
          @media (max-width: 480px) {
            margin-top: ${unit};
          }
        `}>
        {React.useMemo(
          () => (
            <>
              <Link href={url}>{title}</Link>
              {isNew && <NewTag />}
            </>
          ),
          [isNew, title, url]
        )}
      </Subheading>
      <div
        key={`${url}2`}
        className={css`
          color: ${gray};
          ${sansM};
        `}>
        {description}
      </div>
    </>
  );
});

export default function Home() {
  const dir = path.join(process.cwd(), 'src/app/articles');
  const files = fs.readdirSync(dir, {withFileTypes: true});

  const articles = React.use(
    Promise.all(
      files.map(async (file) => {
        const article = (await import(`./articles/${file.name}`)) as {
          default: () => JSX.Element;
          date: string;
          description: string;
          featuredImage?: string;
          title: string;
        };
        return {
          ...article,
          date: new Date(article.date),
          slug: file.name.replace(/.mdx?$/, ''),
        };
      })
    )
  );

  return (
    <div>
      <div>
        <div
          className={css`
            padding-top: ${unit * 2}px;
            padding-bottom: ${unit * 2}px;
          `}>
          <Title>Stefano J. Attardi</Title>
          <Subtitle
            className={css`
              margin-top: ${unit}px;
              margin-bottom: ${unit}px;
            `}>
            {React.useMemo(
              () => (
                <>
                  Engineering Manager at <Link href="https://coinbase.com/">Coinbase</Link>.
                </>
              ),
              []
            )}
          </Subtitle>
          <EmailButton />
        </div>
        <Heading className={`margin-top: ${unit}px`}>Articles</Heading>
        {articles
          .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
          .map(({slug, title, date}, i) => [
            // eslint-disable-next-line react-memo/require-usememo-children
            <Heading
              key={`${i}0`}
              className={css`
                margin-top: ${unit}px;
                margin-bottom: ${unit / 4}px;
              `}>
              <Link to={slug}>{title}</Link>{' '}
              {Date.now() - date.valueOf() < 7 * 24 * 60 * 60 * 1000 && <NewTag />}
            </Heading>,
            <DateView key={`${i}1`} date={date} />,
          ])}
        <div
          className={css`
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: ${unit}px;

            @media (max-width: 490px) {
              display: block;
            }
          `}>
          <Heading
            className={css`
              grid-column: 1/3;
              margin-top: ${unit * 2}px;
            `}>
            Projects
          </Heading>
          <ProjectRow
            url="https://itunes.apple.com/app/movement-watch-tracker/id1329445157"
            title="Movement"
            description="iOS app to set and track mechanical watches."
          />
          <ProjectRow
            url="https://pdfbymail.com/"
            title="Send PDF by Mail"
            description="Web app to instantly send a physical letter anywhere in the world."
          />
          <ProjectRow
            url="https://thecapturedproject.com/"
            title="Captured"
            description="People in prison drawing people who should be."
          />
          <ProjectRow
            url="https://swarmation.com/"
            title="Swarmation"
            description="An in-browser real-time multiplayer game, winner of the 2010 Node.js Knockout."
          />
          <ProjectRow
            url="https://justpickthis.com/"
            title="Just Pick This"
            description="A minimal product review site."
          />
          <ProjectRow
            url="https://napkincalc.appspot.com/"
            title="Napkin"
            description="Experimental spreadsheet-as-documents web app."
          />
          <Heading
            className={css`
              grid-column: 1/3;
              margin-top: ${unit * 2}px;
            `}>
            Code
          </Heading>
          <ProjectRow
            url="https://github.com/steadicat/grindelwald"
            title="Grindelwald"
            description="Tiny functional reactive programming library with dark magic."
          />
          <ProjectRow
            url="https://github.com/steadicat/react-rebound"
            title="React Rebound"
            description="High-performance spring-based animations for React."
          />
          <ProjectRow
            url="https://github.com/steadicat/vectorinox"
            title="Vectorinox"
            description="A swiss-army knife for converting and processing SVG files."
          />
        </div>
        <div
          className={css`
            display: flex;
            justify-content: space-around;
            margin-top: ${unit * 4}px;
          `}>
          <div
            className={css`
              ${sansBoldS};
            `}>
            <EmailLink />
          </div>
          <div
            className={css`
              ${sansBoldS};
            `}>
            <Link rel="me" href="https://twitter.com/steadicat">
              Twitter
            </Link>
          </div>
          <div
            className={css`
              ${sansBoldS};
            `}>
            <Link rel="me" href="https://github.com/steadicat">
              GitHub
            </Link>
          </div>
          <div
            className={css`
              ${sansBoldS};
            `}>
            <Link rel="me" href="https://mas.town/@steadicat">
              Mastodon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
