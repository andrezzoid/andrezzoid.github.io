import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Link from "../components/link"
import SEO from "../components/seo"

// TODO clearreview reviews?
// TODO personality profile
// TODO strengths/weaknesses

class Resume extends React.Component {
  render() {
    const { data } = this.props
    const picture = data.avatar.childImageSharp.fluid
    return (
      <Layout location={this.props.location}>
        <SEO title="About André" />
        <div className="max-w-4xl font-serif">
          <h1 className="text-5xl leading-tight font-sans font-bold mb-8">
            Hi, I'm André Jonas{" "}
            <span role="img" aria-label="waving hand">
              👋
            </span>
          </h1>
          <Image
            className="mb-8"
            fluid={picture}
            alt="André Jonas at the beach"
          />

          <p className="leading-relaxed mb-8">
            But you can just call me <strong>Jonas</strong>. I am a seasoned
            software engineer and a former teacher working remotely from the{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="https://goo.gl/maps/ijXMBjcAbL43eFpX7"
            >
              Algarve, Portugal.
            </Link>{" "}
            I am a geek, a problem solver, a communicator and forever a student.
            My mission is to share knowledge and to support fellow engineers to
            do their best work.
          </p>

          <p className="leading-relaxed mb-8">
            I am also a co-organiser of a local tech community called{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="https://chat.geeksessions.io/"
            >
              Geek Sessions.
            </Link>
          </p>

          <p className="leading-relaxed mb-8">
            Born in 1988 and raised in the south of Portugal, I've moved to
            Lisbon at 19 to study Computer Engineering. Halfway through I've
            started doing websites and teaching programming, web design and web
            development as a way to pay for my tuition fees and expenses in
            Lisbon. In the next 5 years I've taught thousands of students, even
            some of my University colleagues (they've all nailed their exams,
            obviously{" "}
            <span role="img" aria-label="grining face with squinting eyes">
              😄
            </span>
            ).
          </p>

          <p className="leading-relaxed mb-8">
            Moved back to the Algarve in 2015 to be with my wonderful wife and
            our crazy dogs but there were little to no jobs here for me so I've
            started working remotely. Since then I've worked with such amazing
            and talented people in such companies like{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="https://www.yld.io/"
            >
              YLD
            </Link>
            ,{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="https://www.dazn.com/"
            >
              DAZN
            </Link>{" "}
            (as a{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="https://www.yld.io/case-study/dazn-live-sports-at-scale"
            >
              YLD consultant
            </Link>
            ),{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="http://www.people.io/"
            >
              People.io
            </Link>
            ,{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="https://www.betarena.com/"
            >
              Betarena
            </Link>
            ,{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="http://maiskperfeito.com/"
            >
              MKP
            </Link>{" "}
            and others.
          </p>
          <p className="leading-relaxed mb-8">
            I'm so grateful to be able to work remotely and live the life I want
            to live. I get to meet amazing people all around the world, to live
            in the countryside but near the beach, to have pet animals, to have
            my own farm and grow my own food and I get to do swimming and
            surfing every week. I am truly blessed{" "}
            <span role="img" aria-label="hands pressed together">
              🙏
            </span>
          </p>
          <hr className="border-gray-800 max-w-xs mx-auto mt-12 mb-12" />
          <p className="text-3xl font-bold leading-tight">
            I'm back on the job market{" "}
            <span role="img" aria-label="party popper">
              🎉
            </span>{" "}
            and looking for a remote position alongside a bright and kind group
            of individuals that share my values - fairness, responsability and
            transparency. If you think I could be a great fit for your company,
            feel free to{" "}
            <Link
              className="text-green-500 hover:text-green-400"
              to="mailto:hey@andrejonas.com"
            >
              drop me a line.
            </Link>
          </p>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query AboutPageQuery {
    avatar: file(absolutePath: { regex: "/secondary-pic.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1024) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default Resume
