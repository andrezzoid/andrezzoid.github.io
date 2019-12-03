import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import Link from "./link"
import Social from "./social"

// TODO find a better place for navigation or a way to graphql it
const navigation = [
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Meta",
    path: "/about",
  },
]

const Navigation = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 45) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)

  const { author, title } = data.site.siteMetadata
  const avatar = data.avatar.childImageSharp.fixed

  const currentPage = navigation.find(({ path }) =>
    location.pathname.startsWith(path)
  )

  return (
    <div className="flex flex-row flex-wrap justify-between items-center md:h-12 my-4 text-xl">
      <div className="w-full md:w-auto order-3 md:order-none -ml-2">
        {navigation.map(page => (
          <Link
            className="font-sans font-semibold md:text-base p-2 leading-loose"
            to={page.path}
            key={page.path}
          >
            {page.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        {currentPage && (
          <Link className="pr-3" to="/">
            <Image
              className="flex-shrink-0 rounded-full bg-gray-800"
              fixed={avatar}
              alt={author}
              loading="eager"
              imgStyle={{
                borderRadius: "100%",
              }}
            />
          </Link>
        )}
        <Link className="font-sans font-black py-1 uppercase" to="/">
          {title}
        </Link>
      </div>
      <div className="-mx-2">
        <Social />
      </div>
    </div>
  )
}

export default Navigation
