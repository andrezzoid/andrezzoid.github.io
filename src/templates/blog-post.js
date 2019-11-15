import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import components from "../components/mdx"
import RecentPosts from "../components/recent-posts"
import SEO from "../components/seo"
import formatReadingTime from "../utils/format-reading-time"

class BlogPostTemplate extends React.Component {
  render() {
    const { post, site } = this.props.data
    const siteTitle = site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className="flex flex-col items-center font-serif">
          <header className="max-w-3xl w-full mb-12">
            <h1 className="text-5xl leading-tight font-serif font-bold">
              {post.frontmatter.title}
            </h1>
            <p className="text-gray-600 font-sans text-base">
              {formatReadingTime(post.timeToRead)}
            </p>
          </header>
          <section className="max-w-3xl text-xl">
            <MDXProvider components={components}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
          </section>
          <footer className="max-w-3xl">
            <hr className="h-px mx-auto mt-8 mb-12 border-gray-800" />
            <Bio />
          </footer>
        </article>

        {/* <nav className="max-w-2xl">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link
                  className="text-green-500 hover:text-green-400"
                  to={previous.fields.slug}
                  rel="prev"
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  className="text-green-500 hover:text-green-400"
                  to={next.fields.slug}
                  rel="next"
                >
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav> */}

        <div className="max-w-4xl">
          <RecentPosts />
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    post: mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
