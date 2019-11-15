import React from "react"

import backgroundImage from "../images/sorry.gif"
import Link from "../components/link"
import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="404: Not Found" />
        <img src={backgroundImage} alt="Dog says sorry" />
        <h1 className="text-4xl leading-loose">
          My bad, this page doesn&#39;t exist
        </h1>
        <Link className="text-green-500 hover:text-green-400" to="/">
          ← Let's go back
        </Link>
      </Layout>
    )
  }
}

export default NotFoundPage
