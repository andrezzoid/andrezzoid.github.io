import React from "react"
import GatsbyLink from "gatsby-link"

const Link = ({ to, ...props }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return <GatsbyLink to={to} {...props} />
  }

  return <a href={to} {...props} />
}

export default Link
