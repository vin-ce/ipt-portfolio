import React, { useState } from "react"
import { graphql } from "gatsby"
import SVG from "react-inlinesvg"

import Layout from "../components/Layout"
import Filters from "../components/Filters"
import Carousel from "../components/Carousel"

import filtersData from "../../content/sections/categories.json"

import classes from "../styles/projects.module.styl"

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

  // ============
  // CREATE MODAL
  // ============

  const onThumbnailClick = projectData => {

    let date = new Date(projectData.year_completed)
    date = `${date.getFullYear()}-${date.getMonth() + 1}`

    let imagesArr = [];

    projectData.images.forEach((data, index) => {
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
            <SVG src="/img/closeIcon.svg" onClick={ () => setProjectModal(null) } />
          </div>
          <Carousel images={ imagesArr } />
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


  // =================
  // CREATE THUMBNAILS
  // =================

  let projectsArr = [];

  selectedProjects.forEach((edge, index) => {
    const projectData = edge.node.frontmatter

    // // IMAGE SOLUTION
    // const projectEl = (
    //   <div
    //     key={ `${projectData.project_name}_${index}` }
    //     className={ classes.thumbnailContainer }
    //     onClick={ () => onThumbnailClick(projectData) }
    //   >
    //     <img src={ projectData.images[0].image.publicURL } className={ classes.thumbnail } />
    //   </div>
    // )

    let iconsArr = []

    // matches section names of the project with those in filtersData 
    // which has corresponding icon srcs
    projectData.categories_list[0].category_items[0].section_name.forEach(projectSectionName => {

      for (let i = 0; i < filtersData.categories_list.length; i++) {
        let found = false;

        filtersData.categories_list[i].category_items.some((filtersSection, sectionIndex) => {
          if (filtersSection.section_name === projectSectionName) {
            found = true
            iconsArr.push({ categoryIndex: i, sectionIndex, iconSrc: filtersSection.section_icon, sectionName: projectSectionName })
            // return true breaks out of the some loops
            return true
          }
        })

        // if already found, no need to check remaining categories
        if (found) break
      }
    })

    // have categories in order
    // if categories same, sort by section
    iconsArr.sort((a, b) => {
      let order = a.categoryIndex - b.categoryIndex
      if (order === 0) order = a.sectionIndex
      return order
    })

    let iconsEl = []
    iconsArr.forEach((icon, index) => {
      let curCategoryIndex = 0
      if (icon.categoryIndex !== curCategoryIndex) iconsEl.push(<span key={ `divider_${index}` } className={ classes.divider }>|</span>)
      // check if icon category is included in filters category

      let iconClass = []
      // if is in filtered arr
      if (selectedFiltersArr.includes(icon.sectionName)) iconClass.push(classes.inFilter)

      iconsEl.push(
        <SVG key={ `project-icon_${index}` } className={ iconClass.join(" ") } src={ icon.iconSrc } />
      )
    })

    // // TEXT SOLUTION
    const projectEl = (
      <div
        key={ `${projectData.project_name}_${index}` }
        className={ classes.projectTextContainer }
        onClick={ () => onThumbnailClick(projectData) }
      >
        <span className={ classes.projectText }>{ projectData.project_name }</span>
        <span className={ classes.projectCategories }>{ iconsEl }</span>
      </div>

    )

    projectsArr.push(projectEl)
  })

  return (
    <Layout>
      <h1>Projects</h1>
      <Filters
        context='projects'
        selectedFiltersArr={ selectedFiltersArr }
        setSelectedFiltersArr={ setFilters }
        location={ props.location }
      />

      {/* <div className={ classes.thumbnailsContainer }>
        { projectsArr }
      </div> */}
      <div className={ classes.projectTextsContainer }>
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