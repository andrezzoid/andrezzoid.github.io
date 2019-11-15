import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Link from "./link"
import formatReadingTime from "../utils/format-reading-time"

const Post = ({ excerpt, slug, timeToRead, title }) => (
  <article className="flex flex-col w-auto lg:w-1/3 p-10 md:mx-4 mb-8 rounded border border-gray-700">
    <header className="mb-3">
      <h4 className="text-green-500 hover:text-green-400 text-2xl mb-1 font-serif">
        <Link to={slug}>{title}</Link>
      </h4>
    </header>
    <section className="flex-grow mb-3">
      <p
        className="font-serif"
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    </section>
    <footer>
      <small className="font-sans text-gray-600">
        {formatReadingTime(timeToRead)}
      </small>
    </footer>
  </article>
)

const RecentPosts = () => {
  const data = useStaticQuery(graphql`
    query RecentPostsQuery {
      posts: allMdx(
        filter: { fileAbsolutePath: { regex: "//content/blog//" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
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
  `)
  const { posts } = data

  return (
    <section>
      <h2 className="mt-20 mb-12 text-3xl text-center gatsby-link font-serif font-bold leading-tight">
        Recent Articles
      </h2>
      <div className="flex flex-col lg:flex-row justify-center md:-mx-4 md:-mb-8">
        {posts.edges.map(({ node }) => (
          <Post
            key={node.fields.slug}
            excerpt={node.frontmatter.description || node.excerpt}
            slug={node.fields.slug}
            timeToRead={node.timeToRead}
            title={node.frontmatter.title || node.fields.slug}
          />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          className="bg-transparent text-green-500 hover:text-green-400 font-sans py-2 px-4"
          to="/blog"
        >
          View all articles
        </Link>
      </div>
    </section>
  )
}

export default RecentPosts
