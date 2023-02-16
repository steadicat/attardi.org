import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';

export async function get(context) {
  const articles = await getCollection('articles');
  return rss({
    title: 'Stefano J. Attardi',
    description:
      'Engineering Manager at Coinbase. Former UI engineer and designer, specializing in React and React performance. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com.',
    site: context.site,
    items: articles.map(({slug, data: {title, date}}) => ({
      title,
      pubDate: date,
      // TODO: content
      link: `/${slug}`,
    })),
  });
}
