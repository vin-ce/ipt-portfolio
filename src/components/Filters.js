import React, { useEffect, useState, useRef } from "react"
import SVG from "react-inlinesvg"
import { navigate } from "gatsby"

import classes from "../styles/filters.module.styl"
import data from "../../content/sections/categories.json"

const Filters = props => {

  // =================
  // SELECTING FILTERS
  // =================

  // const [filtersElArr, setFiltersElArr] = useState([])
  let filtersElArr = []

  const selectSectionItem = (e, el) => {

    // e.target from clicking
    // el from props.location.state
    let curEl;
    if (e) curEl = e.target
    if (el) curEl = el

    if (props.context === 'projects') {

      // if no selected class
      // a1. add selected + active classes to section item
      // a2. select parent, set to just active class & remove parent from selectedFiltersArr
      // a3. loop through siblings
      // a4. if not selected, remove active class on siblings

      // if selected already
      // b1. remove items that are selected + active from selectedFiltersArr
      // b2. loop through arr of siblings against selectedFiltersArr to see if any siblings are selected
      // b3. if there aren't any selected, remove classes from parent el, effectively resetting that section

      // each element holds name and index information
      // to allow for easy matching of the data object to the element
      const sectionItemName = curEl.getAttribute('name')

      const categoryIndex = parseInt(curEl.getAttribute('data-category_index'))
      const sectionIndex = parseInt(curEl.getAttribute('data-section_index'))
      const sectionItemIndex = parseInt(curEl.getAttribute('data-section_item_index'))

      const parentSectionName = data.categories_list[categoryIndex].category_items[sectionIndex].section_name
      const parentSectionEl = document.querySelector(`span[name="${parentSectionName}"]`)

      // siblings of clicked section item
      const sectionItemsArr = data.categories_list[categoryIndex].category_items[sectionIndex].section_items

      const sectionIsSelected = curEl.classList.contains(classes.selected)
      const selectedFiltersArrCopy = [...props.selectedFiltersArr]

      // ------------------------------

      if (!sectionIsSelected) {
        // a1
        curEl.classList.add(classes.selected, classes.active)
        selectedFiltersArrCopy.push(sectionItemName)

        // a2
        parentSectionEl.classList.remove(classes.selected)
        parentSectionEl.classList.add(classes.active)
        let i = selectedFiltersArrCopy.indexOf(parentSectionName)
        if (i > -1) selectedFiltersArrCopy.splice(i, 1)
        // if (i === -1) selectedFiltersArrCopy.push(parentSectionName)

        // a3
        sectionItemsArr.forEach((sectionItem, index) => {
          // if index = cur section item's index
          if (index === sectionItemIndex) return

          const sectionItemEl = document.querySelector(`span[name="${sectionItem.section_item_name}"]`)

          // a4 - remove classes from section item if is *not* already selected
          if (!sectionItemEl.classList.contains(classes.selected)) sectionItemEl.classList.remove(classes.selected, classes.active)


        })

      } else {

        // b1
        curEl.classList.remove(classes.selected, classes.active)
        selectedFiltersArrCopy.splice(selectedFiltersArrCopy.indexOf(sectionItemName), 1)

        // b2 - if there is a sibling that is selected
        let hasOtherSelected = false;
        for (let i = 0; i < sectionItemsArr.length; i++) {
          if (selectedFiltersArrCopy.indexOf(sectionItemsArr[i].section_item_name) > -1) {
            hasOtherSelected = true;
            break;
          }
        }

        // b3
        if (!hasOtherSelected) {
          parentSectionEl.classList.remove(classes.selected, classes.active)
          // selectedFiltersArrCopy.splice(selectedFiltersArrCopy.indexOf(parentSectionName), 1) // this is assuming that the parent element is in the filtersArr with the children elements
        }

      }


      props.setSelectedFiltersArr(selectedFiltersArrCopy)

    }

    if (props.context === 'home') {
      navigate('/projects/', {
        state: { filter: { type: 'sectionItem', name: curEl.getAttribute("name") } }
      })
    }
  }

  // --------------
  // SELECT SECTION
  // --------------

  const selectSection = (e, el) => {

    let curEl;
    if (e) curEl = e.target
    if (el) curEl = el

    if (props.context === 'projects') {
      // if not yet selected:
      // a1. add selected + active classes - check if section already in selectedFiltersArr (from previously selecting sectionItems), if no, add to arr
      // a2. loop through children section items
      // a3. turn all into active classes (removing any selected)
      // a4. remove children section items from selectedFiltersArr

      // if already selected:
      // b1. remove classes
      // b2. remove from selectedFiltersArr
      // // a2.
      // b3. remove classes
      // // a4.

      const sectionName = curEl.getAttribute('name')

      const categoryIndex = parseInt(curEl.getAttribute('data-category_index'))
      const sectionIndex = parseInt(curEl.getAttribute('data-section_index'))

      const sectionItemsArr = data.categories_list[categoryIndex].category_items[sectionIndex].section_items

      const selectedFiltersArrCopy = [...props.selectedFiltersArr]

      const categoryIsSelected = curEl.classList.contains(classes.selected)

      // ------------------------------

      if (!categoryIsSelected) {
        // a1
        curEl.classList.add(classes.selected, classes.active)
        let i = selectedFiltersArrCopy.indexOf(sectionName)
        if (i === -1) selectedFiltersArrCopy.push(sectionName)

      } else {
        // b1 - reset selected + active classes
        curEl.classList.remove(classes.selected, classes.active)

        // b2 - remove from arr
        selectedFiltersArrCopy.splice(selectedFiltersArrCopy.indexOf(sectionName), 1)
      }

      // a2 - going through section items
      if (sectionItemsArr) {
        sectionItemsArr.forEach(sectionItems => {
          const sectionItemEl = document.querySelector(`span[name="${sectionItems.section_item_name}"]`);

          // a3 - add active class to section items on category select
          // b3 - remove on de-select
          if (!categoryIsSelected) {
            sectionItemEl.classList.add(classes.active)
            sectionItemEl.classList.remove(classes.selected)
          }
          else sectionItemEl.classList.remove(classes.active, classes.selected)

          // a4 - remove section item from selectedFiltersArr 
          const sectionItemName = sectionItemEl.getAttribute('name')
          const i = selectedFiltersArrCopy.indexOf(sectionItemName)
          if (i > -1) selectedFiltersArrCopy.splice(i, 1)
        })
      }

      props.setSelectedFiltersArr(selectedFiltersArrCopy)

    }

    if (props.context === 'home') {
      navigate('/projects/', {
        state: {
          filter: {
            type: 'section',
            categoryName: data.categories_list[curEl.getAttribute('data-category_index')].category_name,

            name: curEl.getAttribute("name")
          }
        }
      })

    }

  }

  // ===============
  // CREATE ELEMENTS
  // ===============

  // useEffect(() => {

  // creating the categories, sections and section item elements
  data.categories_list.forEach((category, categoryIndex) => {

    let sections = [];
    let sectionItems = [];


    // HARDCODE
    // hide Building Types filter
    if (category.category_name === 'Building Types') return

    if (category.category_items) {
      category.category_items.forEach((section, sectionIndex) => {

        if (section.section_items) {
          section.section_items.forEach((sectionItem, sectionItemIndex) => {

            const sectionItemEl = (
              <div className={ classes.sectionItem } key={ `c-${categoryIndex}_s-${sectionIndex}_sI-${sectionItemIndex}` }>
                <span
                  name={ sectionItem.section_item_name }
                  data-category_index={ categoryIndex }
                  data-section_index={ sectionIndex }
                  data-section_item_index={ sectionItemIndex }
                  onClick={ selectSectionItem }
                >
                  - { sectionItem.section_item_name }
                </span>
              </div>
            )

            sectionItems.push(sectionItemEl)
          })
        }

        // pretty much obsolete as no building types filter
        const sectionClasses = [classes.section]
        if (sectionItems.length === 0) sectionClasses.push(classes.noChildren)

        const sectionEl = (
          <div className={ sectionClasses.join(' ') } key={ `c-${categoryIndex}_s-${sectionIndex}` }>
            <span
              name={ section.section_name }
              data-category_index={ categoryIndex }
              data-section_index={ sectionIndex }
              onClick={ selectSection }
              className={ classes.sectionName }
            >
              {/* <span className={ classes.sectionIcon }> */ }
              <SVG src={ section.section_icon } className={ classes.sectionIcon } />
              {/* </span> */ }
              { section.section_name }
            </span>
            { sectionItems }
          </div >
        )

        sections.push(sectionEl)
        // reset for each loop
        sectionItems = [];

      })
    }

    const categoryEl = (
      <div name={ category.category_name } className={ classes.category } key={ `c-${categoryIndex}` }>
        <div className={ classes.headingContainer }>
          <span className={ classes.categoryNameContainer } >
            { category.category_name }
          </span>

        </div>
        <div className={ classes.sectionContainer }>
          { sections }
        </div>
      </div>
    )

    // setFiltersElArr([categoryEl])
    filtersElArr.push(categoryEl)
  })



  // }, [props.selectedFiltersArr])



  // ---------------------
  // CREATE BUILDING TYPES
  // ---------------------
  // HARDCODE

  // if filters arr includes a building types 
  if (props.context === 'projects') {

    let buildingTypesData = { full: null, names: [] };
    data.categories_list.forEach(category => {
      if (category.category_name === 'Building Types') {
        // entire data with name & icon
        buildingTypesData.full = category.category_items
        // just names
        category.category_items.forEach(section => buildingTypesData.names.push(section.section_name))
      }
    })

    // if filter is of building type category
    const hasBuildingTypesFilter = buildingTypesData.names.some(name => props.selectedFiltersArr.includes(name))

    if (hasBuildingTypesFilter) {
      const selectedFilterName = props.selectedFiltersArr[0]
      let selectedFilterIcon;

      buildingTypesData.full.forEach(section => {
        if (section.section_name === selectedFilterName) selectedFilterIcon = section.section_icon
      })

      const removeBuildingTypesEl = (name) => {
        const selectedFiltersArrCopy = props.selectedFiltersArr
        const i = selectedFiltersArrCopy.indexOf(name)
        if (i > -1) selectedFiltersArrCopy.splice(i, 1)
        props.setSelectedFiltersArr(selectedFiltersArrCopy)
      }

      filtersElArr.push(
        <div className={ classes.category } key={ `category_building-type` }>
          <div className={ classes.headingContainer }>
            <span className={ classes.categoryNameContainer } >
              Building Type
                </span>

          </div>
          <div className={ classes.sectionContainer }>
            <div className={ [classes.section, classes.noChildren].join(' ') }>
              <span
                onClick={ () => removeBuildingTypesEl(selectedFilterName) }
                className={ [classes.sectionName, classes.active, classes.selected].join(" ") }
              >
                <SVG src={ selectedFilterIcon } className={ classes.sectionIcon } />
                { selectedFilterName }
              </span>
            </div >
          </div>
        </div>

      )

    }

  }




  // receives what was clicked in the filters on home page
  // and selects that on the project page
  useEffect(() => {
    if (props.context === 'projects')
      if (props.location.state)
        if (props.location.state.filter) {
          const type = props.location.state.filter.type
          const selectedEl = document.querySelector(`span[name="${props.location.state.filter.name}"]`)

          if (type === 'section') selectSection(null, selectedEl)
          if (type === 'sectionItem') selectSectionItem(null, selectedEl)

        }
  }, [])





  const filtersClasses = [classes.filtersContainer]
  if (props.context === 'home') filtersClasses.push(classes.home)

  return (
    <div className={ filtersClasses.join(' ') }>
      { filtersElArr }
    </div>
  )
}

export default Filters

