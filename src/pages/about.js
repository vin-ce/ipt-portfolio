import React from "react"
import Layout from "../components/Layout"
import { useStaticQuery, graphql } from "gatsby"


const About = props => {

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              certifications_images {
                image {
                  absolutePath
                  relativePath
                }
              }
            }
          }
        }
      }
    }
  `
  )

  console.log('DATA: ', data)


  return (
    <Layout>
      <div>About</div>
    </Layout>
  )
}

export default About

