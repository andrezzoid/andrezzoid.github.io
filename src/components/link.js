import React from "react"
import GatsbyLink from "gatsby-link"

const Link = ({ to, ...props }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return <GatsbyLink to={to} {...props} />
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={to} {...props} />
}

export default Link
