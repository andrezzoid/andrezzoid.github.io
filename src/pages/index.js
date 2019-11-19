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
        <SEO />
        <div className="flex flex-col items-center">
          <section className="flex flex-col md:flex-row items-center mb-4">
            <h1 className="text-4xl lg:text-5xl leading-tight font-bold">
              Hi, I'm André{" "}
              <span role="img" aria-label="waving hand">
                👋
              </span>{" "}
              I help engineers build quality software in remote or distributed
              teams.{" "}
              <Link className="text-green-500 hover:text-green-400" to="/about">
                Get to know me.
              </Link>
            </h1>
            <Image
              alt="André Jonas picture"
              className="max-w-sm md:max-w-xs flex-shrink-0 w-full order-first md:order-none rounded-full mb-12 md:mb-0 bg-gray-800"
              fluid={avatar.childImageSharp.fluid}
              imgStyle={{
                borderRadius: "100%",
              }}
              loading="eager"
            />
          </section>
          <RecentPosts />
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
        fluid(maxWidth: 360) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
