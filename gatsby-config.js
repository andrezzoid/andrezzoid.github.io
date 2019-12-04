const rssFeed = require("gatsby-plugin-mdx/feed")

const gatsbyRemarkImages = {
  resolve: `gatsby-remark-images`,
  options: {
    maxWidth: 1152,
    showCaptions: true,
    markdownCaptions: true,
    // TODO how to define this with Tailwind?
    wrapperStyle: `color:#718096;font-size:1rem;font-style:italic;text-align:center`,
    withWebp: true,
  },
}

module.exports = {
  siteMetadata: {
    title: `André Jonas`,
    author: `André Jonas`,
    description: `I'm André Jonas, a seasoned software engineer and former teacher working remotely from Portugal. I am a geek, a problem solver, a communicator and forever a student.`,
    email: `hey@andrejonas.com`,
    siteUrl: `https://andrejonas.com/`,
    social: {
      github: `https://github.com/andrezzoid/`,
      linkedin: `https://www.linkedin.com/in/andrejonas/`,
      twitter: `https://twitter.com/andrezzoid/`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        // defaultLayouts: {
        //   default: here("./src/templates/markdown-page.js"),
        // },
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          gatsbyRemarkImages,
          `gatsby-remark-embedder`,
          `gatsby-remark-smartypants`,
        ],
        plugins: [
          // FIXME: keep an eye for a fix on this issue: https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-510153237
          gatsbyRemarkImages,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-59185932-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, posts } }) => {
              return posts.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                }
              })
            },
            query: `
              {
                posts: allMdx(
                  sort: { fields: [frontmatter___date], order: DESC },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/blog/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
    `gatsby-plugin-postcss`,
  ],
}
