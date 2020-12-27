import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Categories from "../components/Categories"
import Modal from "../components/Modal"

import classes from "../styles/projects.module.styl"

import CloseIcon from "../../content/assets/closeIcon.svg"

const Projects = props => {

  const data = props.data.allMarkdownRemark.edges

  const [selectedFiltersArr, setSelectedFiltersArr] = useState([])
  const [selectedProjects, setSelectedProjects] = useState(data)
  const [projectModal, setProjectModal] = useState(null)

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

  const onThumbnailClick = projectData => {
    console.log(projectData)

    let date = new Date(projectData.year_completed)
    date = `${date.getFullYear()}-${date.getMonth() + 1}`

    let imagesArr = [];

    projectData.images.forEach((data, index) => {
      // data.image.publicURL
      let imageEl = (
        <img src={ data.image.publicURL } key={ `${projectData.project_name}-image_${index}` } />
      )
      imagesArr.push(imageEl)
    })

    let modal = (
      <React.Fragment>
        <div className={ classes.modalContainer } onClick={ () => setProjectModal(null) } />
        <div className={ classes.projectContainer }>
          <div className={ classes.titleContainer }>
            { projectData.project_name }
            <span className={ classes.closeIcon } onClick={ () => setProjectModal(null) }> <CloseIcon /> </span>
          </div>
          <Modal images={ imagesArr } />
          <div>
            { date }
          </div>
          <p>
            { projectData.description }
          </p>
        </div>
      </React.Fragment>
    )

    setProjectModal(modal)
  }

  let projectsArr = [];

  selectedProjects.forEach((edge, index) => {
    const projectData = edge.node.frontmatter

    const projectEl = (
      <div
        key={ `${projectData.project_name}_${index}` }
        className={ classes.thumbnailContainer }
        onClick={ () => onThumbnailClick(projectData) }
      >
        <img src={ projectData.images[0].image.publicURL } className={ classes.thumbnail } />
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

      <div className={ classes.thumbnailsContainer }>
        { projectsArr }
      </div>

      {projectModal ? projectModal : null }
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
                publicURL
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