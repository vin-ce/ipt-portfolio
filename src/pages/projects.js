import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Categories from "../components/Categories"

const Contact = props => {

  const [selectedCategoriesArr, setSelectedCategoriesArr] = useState([])


  // if query string in url

  // display appropriate project
  // ?project=project-name

  // pre-select appropriate categories

  // maybe a slugify func on both front-page and projects page to match titles?

  // if categories component on front page
  // attach query onto link=to"/projects?category=architectural-design&section-name=single-residential-house"


  return (
    <Layout>
      <h1>Projects</h1>
      <Categories
        context='projects'
        selectedCategoriesArr={ selectedCategoriesArr }
        setSelectedCategoriesArr={ setSelectedCategoriesArr }
      />
    </Layout>
  )
}

export default Contact


export const projectsQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            project_name
            year_completed
            description
            images {
              image {
                relativePath
              }
            }
            categories_list {
              category_list_name
              category_items {
                section_name
                section_items {
                  section_item_name
                }
              }
            }
          }
        }
      }
    }
  }
`