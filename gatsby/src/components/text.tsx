import * as React from 'react';
import {View} from 'glamor/jsxstyle';
import {
  sansBoldXL,
  sansBoldM,
  sansBoldXS,
  sansBoldS,
  sansBoldL,
  sansXS,
  sansM,
  sansS,
} from '../design/text';
import {unit} from '../design/layout';
import GatsbyLink from 'gatsby-link';
import {linkColor, hoverLinkColor, activeLinkColor, gray, white} from '../design/colors';

export const Title = ({
  children,
  marginTop = 0,
  marginBottom = 0,
  id,
}: {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
  id?: string;
}) => (
  <View component="h1" {...sansBoldXL} marginTop={marginTop} marginBottom={marginBottom} id={id}>
    {children}
  </View>
);

export const Subtitle = ({
  children,
  marginTop = 0,
  marginBottom = 0,
}: {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
}) => (
  <View component="h2" {...sansM} marginTop={marginTop} marginBottom={marginBottom} color={gray}>
    {children}
  </View>
);

export const Heading = ({
  children,
  marginTop = 0,
  marginBottom = 0,
  gridColumn,
}: {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
  gridColumn?: string;
}) => (
  <View component="h2" {...sansBoldL} marginTop={marginTop} marginBottom={marginBottom} /* TODO */ style={{gridColumn}}>
    {children}
  </View>
);

export const Subheading = ({
  children,
  css = {},
  media = [],
  marginTop = 0,
  marginBottom = 0,
}: {
  children: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
  css?: React.CSSProperties;
  media?: [string, React.CSSProperties][];
}) => (
  <View
    component="h3"
    {...sansBoldM}
    css={css}
    media={media}
    marginTop={marginTop}
    marginBottom={marginBottom}>
    {children}
  </View>
);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Setember',
  'October',
  'November',
  'December',
];

function format(date: Date) {
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()},  ${date.getUTCFullYear()}`;
}

export const DateView = ({date}: {date: string}) => (
  <View component="h3" {...sansXS} fontSize={16} marginBottom={0} color={gray} marginTop={unit / 2}>
    {format(new Date(date))}
  </View>
);

export const Link = ({
  children,
  to,
  href,
  ...props
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
}) => (
  <View
    component={to ? GatsbyLink : 'a'}
    color={linkColor}
    hover={{color: hoverLinkColor}}
    active={{
      color: activeLinkColor,
      transitionDuration: '0.1s',
    }}
    lineHeight="14px"
    transition="0.5s color"
    textDecoration="none"
    to={to}
    href={href}
    {...props}>
    {children}
  </View>
);

export const Button = ({
  children,
  to,
  href,
  ...props
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
}) => (
  <View
    component={to ? GatsbyLink : 'a'}
    color={white}
    background={linkColor}
    hover={{background: hoverLinkColor}}
    active={{
      background: activeLinkColor,
      transitionDuration: '0.1s',
    }}
    transition="0.5s background"
    textDecoration="none"
    to={to}
    href={href}
    borderRadius={3}
    paddingTop={unit / 2}
    paddingBottom={unit / 2}
    paddingLeft={unit}
    paddingRight={unit}
    display="inline-block"
    marginLeft="auto"
    marginRight="auto"
    textAlign="center"
    marginTop={unit}
    {...sansBoldM}
    {...props}>
    {children}
  </View>
);
