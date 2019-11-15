import React from "react"
import { graphql } from "gatsby"

import formatReadingTime from "../utils/format-reading-time"
import Layout from "../components/layout"
import Link from "../components/link"
import SEO from "../components/seo"

const Post = ({ excerpt, slug, timeToRead, title }) => (
  <article className="max-w-3xl mb-12" key={slug}>
    <header>
      <h2 className="text-3xl mb-2 font-serif">
        <Link className="text-green-500 hover:text-green-400" to={slug}>
          {title}
        </Link>
      </h2>
    </header>
    <section className="mb-2 font-serif">
      <p
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    </section>
    <footer className="text-gray-600 font-sans">
      <small>{formatReadingTime(timeToRead)}</small>
    </footer>
  </article>
)

class Blog extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.posts.edges
    return (
      <Layout location={this.props.location}>
        <SEO title="Blog" />
        {posts.map(({ node }) => (
          <Post
            excerpt={node.frontmatter.description || node.excerpt}
            slug={node.fields.slug}
            timeToRead={node.timeToRead}
            title={node.frontmatter.title || node.fields.slug}
          />
        ))}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    posts: allMdx(
      filter: { fileAbsolutePath: { regex: "//content/blog//" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

export default Blog
