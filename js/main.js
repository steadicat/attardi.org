import React from 'react';
import ReactDOM from 'react-dom';

/* global require */
export const pages = {
  '/': require('./pages/index'),
  '/error': require('./pages/error'),
  '/notfound': require('./pages/notfound'),
};

export function getPage(path, assets) {
  const Page = pages[path];
  return <Page path={path} assets={assets} />;
}

export function init(path, assets) {
  ReactDOM.render(getPage(path, assets), document);
}
