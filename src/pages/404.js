import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>404</title>
      </Helmet>
      <h1>404: Not Found</h1>
      <p>The page you visited does not exist.</p>
      <Link to="/">Return Home</Link>
    </Layout>
  )
}

export default NotFoundPage
