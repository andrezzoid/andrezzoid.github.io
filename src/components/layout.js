import React from "react"

import Footer from "./footer"
import Navigation from "./navigation"

class Layout extends React.Component {
  render() {
    const { location, children } = this.props

    return (
      <div className="flex flex-col items-center px-6 md:px-20 min-h-screen bg-gray-900 font-sans text-white text-xl">
        <header className="w-full max-w-4xl">
          <Navigation location={location} />
        </header>
        <main className="flex-grow max-w-4xl mt-20">{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
