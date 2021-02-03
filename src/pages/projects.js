import React, { useState } from "react"
import { graphql } from "gatsby"
import SVG from "react-inlinesvg"
import ScrollDown from "../components/ScrollDown"

import Layout from "../components/Layout"
import Filters from "../components/Filters"
import Carousel from "../components/Carousel"
import Button from "../components/Button"

import filtersData from "../../content/sections/categories.json"

import classes from "../styles/projects.module.styl"
import filtersClasses from "../styles/filters.module.styl"

const Projects = props => {


  // clicking building type filter in individual projects page will clear selectedFiltersArr and push in the individual filter. 
  // this filter will then show up in Filters.js

  // =========
  // VARIABLES
  // =========

  const projectsData = props.data.allMarkdownRemark.edges

  // setSelectedFiltersArr is only called in 'setFiltersArr'
  // when trying to set filters, only use setFiltersArr
  const [selectedFiltersArr, setSelectedFiltersArr] = useState([])
  const [selectedProjects, setSelectedProjects] = useState(projectsData)
  const [projectModal, setProjectModal] = useState(null)


  // HARDCODE
  let buildingTypesSectionNamesArr = [];
  filtersData.categories_list.forEach(category => {
    if (category.category_name === 'Building Types') {
      category.category_items.forEach(section => {
        buildingTypesSectionNamesArr.push(section.section_name)
      })
    }
  })



  // =========
  // FUNCTIONS
  // =========

  // sets filters arr + sets which projects are shown based on selected filters
  // this is the function that's passed to Filters.js, not setSelectedFiltersArr
  const setFiltersArr = (arr) => {
    // filtered projects based on selected filters
    let filteredProjects = []

    projectsData.forEach(edge => {
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
      if (arr.length === 0) setSelectedProjects(projectsData)
      else setSelectedProjects(filteredProjects)
    })

    console.log('SELECTED:', arr)

    setSelectedFiltersArr(arr)
  }


  const clearCategories = () => {
    filtersData.categories_list.forEach(category => {

      // HARDCODE
      // skips filters in Building Types category
      if (category.category_name === 'Building Types') return

      category.category_items.forEach(section => {
        // remove classes from sections
        document.querySelector(`span[name="${section.section_name}"]`).classList.remove(filtersClasses.active, filtersClasses.selected)

        // remove classes from section items
        if (section.section_items) section.section_items.forEach(sectionItems => {
          document.querySelector(`span[name="${sectionItems.section_item_name}"]`).classList.remove(filtersClasses.active, filtersClasses.selected)
        })
      })
    })

    // building types element does not add itself if 
    // its filters are not in the selectedFiltersArr
    // so no need to clear styles for it

    setFiltersArr([])

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

    // filters projects sections to the ones that are the Building Types sections
    let buildingTypesArr = [];

    // drills down to list of section names
    projectData.categories_list[0].category_items[0].section_name.forEach(sectionName => {
      // checks if section name is part of building types
      if (buildingTypesSectionNamesArr.includes(sectionName)) {
        buildingTypesArr.push(
          <span
            key={ `buildingType-${sectionName}` }
            className={ classes.buildingTypeSection }
            onClick={ () => {
              clearCategories([])
              setFiltersArr([sectionName])
              setProjectModal(null)
            } }
          >
            { sectionName }
          </span>
        )
      }

    })

    let modal = (
      <React.Fragment>
        <div className={ classes.modalContainer } onClick={ () => setProjectModal(null) } />
        <div className={ classes.projectContainer }>
          <div className={ classes.titleContainer }>
            { projectData.project_name }
            <SVG src="/img/closeIcon.svg" onClick={ () => setProjectModal(null) } />
          </div>
          {/* HARDCODE */ }
          <div className={ classes.buildingTypesContainer }>
            Building Type { buildingTypesArr }
          </div>
          <Carousel images={ imagesArr } />
          {/* <div>
            { date }
          </div> */}
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
      // if (selectedFiltersArr.includes(icon.sectionName)) iconClass.push(classes.inFilter)

      iconsEl.push(
        <SVG key={ `project-icon_${index}` } className={ iconClass.join(" ") } src={ icon.iconSrc } />
      )
    })

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

    // TEXT SOLUTION
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
      <div className={ classes.headingContainer }>
        <h1>Projects</h1>
        {/* if there are filters/ categories selected */ }
        {
          selectedFiltersArr && selectedFiltersArr.length > 0 ?
            <Button
              iconSrc="/img/closeIcon.svg"
              name='Clear Selection'
              onClick={ () => clearCategories([]) }
            /> : null
        }
      </div>

      <Filters
        context='projects'
        selectedFiltersArr={ selectedFiltersArr }
        setSelectedFiltersArr={ setFiltersArr }
        clearCategories={ clearCategories }
        location={ props.location }
      />

      <ScrollDown scrollToId='projects' />

      {/* <div id="projects" className={ classes.thumbnailsContainer }>
        { projectsArr }
      </div> */}
      <div id="projects" className={ classes.projectTextsContainer }>
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