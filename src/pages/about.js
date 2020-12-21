import React from "react"
import Layout from "../components/Layout"
import data from "../../sections/about.json"

const About = props => {
  return (
    <Layout>
      <div>About</div>
      <div>{ data.description }</div>
    </Layout>
  )
}

export default About