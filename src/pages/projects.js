import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Categories from "../components/Categories"
import classes from "../styles/projects.module.styl"

const Projects = props => {

  const data = props.data.allMarkdownRemark.edges

  const [selectedFiltersArr, setSelectedFiltersArr] = useState([])
  const [selectedProjects, setSelectedProjects] = useState(data)

  const setFilters = (arr) => {

    // filtered projects based on selected filters
    let filteredProjects = []

    data.forEach(edge => {
      const projectData = edge.node.frontmatter

      for (let i = 0; i < arr.length; i++) {
        // nested "" is critical so as to not match both residential and residential housing - they are two different filters.
        // if selected filter matches a category the project has, break 
        // so that it only adds the project once.
        if (JSON.stringify(projectData.categories_list).includes(`"${arr[i]}"`)) {
          filteredProjects.push(edge)
          break
        }
      }

      // if no filters, all projects are shown
      if (arr.length === 0) setSelectedProjects(data)
      else setSelectedProjects(filteredProjects)
    })

    setSelectedFiltersArr(arr)
  }

  let projectsArr = [];

  selectedProjects.forEach((edge, index) => {
    const projectData = edge.node.frontmatter
    let date = new Date(projectData.year_completed)
    date = `${date.getFullYear()}-${date.getMonth() + 1}`

    const projectEl = (
      <div key={ `project_${index}` } className={ classes.projectContainer }>
        <h2>
          { projectData.project_name }
        </h2>
        <div>
          { date }
        </div>
        <div>
          { projectData.description }
        </div>
      </div>
    )

    projectsArr.push(projectEl)
  })

  return (
    <Layout>
      <h1>Projects</h1>
      <Categories
        context='projects'
        selectedFiltersArr={ selectedFiltersArr }
        setSelectedFiltersArr={ setFilters }
        location={ props.location }
      />

      <div className={ classes.projectsContainer }>
        { projectsArr }
      </div>

    </Layout>
  )
}

export default Projects


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