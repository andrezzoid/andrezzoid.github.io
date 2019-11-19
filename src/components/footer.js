import React from "react"
import Social from "./social"

const Footer = () => {
  return (
    <footer className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between my-20 text-gray-600">
      <div className="py-2 text-sm text-center">
        © 2015 - {new Date().getFullYear()} •{" "}
        <a href="https://www.gatsbyjs.org">Built with Gatsby</a> • With love,
        from Portugal
      </div>
      <Social />
    </footer>
  )
}

export default Footer
