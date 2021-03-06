require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/img`,
        name: `img`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    // `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-stylus`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
  ],
}
