import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Link from "../components/link"
import RecentPosts from "../components/recent-posts"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { avatar } = data

    return (
      <Layout location={this.props.location}>
        <SEO title="All posts" />
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center">
            <h1 className="text-4xl lg:text-5xl leading-tight font-bold">
              Hi, I'm André 👋 I help engineers build quality software in remote
              or distributed teams.{" "}
              <Link className="text-green-500 hover:text-green-400" to="/about">
                Get to know me.
              </Link>
            </h1>
            <Image
              className="flex-shrink-0 order-first md:order-none rounded-full mb-12 md:mb-0 bg-gray-800"
              fixed={avatar.childImageSharp.fixed}
            />
          </div>
          <div className="max-w-4xl">
            <RecentPosts />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 360, height: 360) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
