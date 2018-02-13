module.exports = {
  siteMetadata: {
    title: 'Stefano J. Attardi',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-typescript',
    'gatsby-plugin-glamor',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/src/articles/`,
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {maxWidth: 560, linkImagesToOriginal: false, sizeByPixelDensity: false},
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smallcaps',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
  ],
};
