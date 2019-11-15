/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import Link from "../components/link"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          description
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, description, social } = data.site.siteMetadata
  return (
    <div className="flex items-center text-base">
      <Image
        className="flex-shrink-0 rounded-full mr-4 bg-gray-800"
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
      />
      <p>
        {description}
        {` `}
        <Link
          className="text-green-500 hover:text-green-400"
          to={social.twitter}
        >
          Follow me on Twitter.
        </Link>
      </p>
    </div>
  )
}

export default Bio
