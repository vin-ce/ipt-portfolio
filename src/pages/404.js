import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={ location } title={ siteTitle }>
      <h1>404: Not Found</h1>
      <p>The page you visited does not exist. Return home <Link to="/">here</Link></p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
