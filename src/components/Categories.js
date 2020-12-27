import React, { useEffect } from "react"
import { navigate } from "gatsby"

import classes from "../styles/categories.module.styl"
import data from "../../content/sections/categories.json"

import Button from "../components/Button"
import CloseIcon from "../../content/assets/closeIcon.svg"

const Categories = props => {

  let categoriesElArr = [];

  const clearCategories = () => {
    // clear all classes
    data.categories_list.forEach(categories => {
      document.querySelector(`span[name="${categories.category_name}"]`).classList = ''

      categories.category_items.forEach(section => {
        document.querySelector(`span[name="${section.section_name}"]`).classList = ''

        if (section.section_items) section.section_items.forEach(sectionItems => {
          document.querySelector(`span[name="${sectionItems.section_item_name}"]`).classList = ''
        })
      })
    })

    // reset selectedFiltersArr
    props.setSelectedFiltersArr([])
  }

  const selectSectionItem = (e, el) => {

    // e.target from clicking
    // el from props.location.state
    let curEl;
    if (e) curEl = e.target
    if (el) curEl = el

    if (props.context === 'projects') {

      // if no selected class
      // a1. add selected + active classes & to selectedFiltersArr
      // a2. select parent, set to just active class & remove parent from selectedFiltersArr
      // a3. loop through siblings
      // a4. if not selected, remove active class on siblings

      // if selected already
      // b1. remove selected + active & from selectedFiltersArr
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
        curEl.className = [classes.selected, classes.active].join(' ')
        selectedFiltersArrCopy.push(sectionItemName)

        // a2
        parentSectionEl.className = classes.active
        let i = selectedFiltersArrCopy.indexOf(parentSectionName)
        if (i > -1) selectedFiltersArrCopy.splice(i, 1)

        // a3
        sectionItemsArr.forEach((sectionItem, index) => {
          // if index = cur section item's index
          if (index === sectionItemIndex) return

          const sectionItemEl = document.querySelector(`span[name="${sectionItem.section_item_name}"]`)

          // a4 - remove classes from section item if is *not* already selected
          if (!sectionItemEl.classList.contains(classes.selected)) sectionItemEl.className = ''

        })

      } else {

        // b1
        curEl.className = ""
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
        if (!hasOtherSelected) parentSectionEl.className = ''

      }

      props.setSelectedFiltersArr(selectedFiltersArrCopy)

    }

    if (props.context === 'home') {
      navigate('/projects/', {
        state: { filter: { type: 'sectionItem', name: curEl.getAttribute("name") } }
      })
    }
  }

  const selectSection = (e, el) => {

    let curEl;
    if (e) curEl = e.target
    if (el) curEl = el

    if (props.context === 'projects') {
      // if not yet selected:
      // a1. add selected + active classes
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
        curEl.className = [classes.selected, classes.active].join(' ')
        selectedFiltersArrCopy.push(sectionName)

      } else {
        // b1 - reset selected + active classes
        curEl.className = ' '

        // b2 - remove from arr
        selectedFiltersArrCopy.splice(selectedFiltersArrCopy.indexOf(sectionName), 1)
      }

      // a2 - going through section items
      if (sectionItemsArr) {
        sectionItemsArr.forEach(sectionItems => {
          const sectionItemEl = document.querySelector(`span[name="${sectionItems.section_item_name}"]`);

          // a3 - add active class to section items on category select
          // b3 - remove on de-select
          if (!categoryIsSelected) sectionItemEl.className = classes.active
          else sectionItemEl.className = ''

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
        state: { filter: { type: 'section', name: curEl.getAttribute("name") } }
      })
    }

  }


  // creating the categories, sections and section item elements
  data.categories_list.forEach((category, categoryIndex) => {

    let sections = [];
    let sectionItems = [];

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
                  { sectionItem.section_item_name }
                </span>
              </div>
            )

            sectionItems.push(sectionItemEl)
          })
        }

        const sectionClasses = [classes.section]
        if (sectionItems.length === 0) sectionClasses.push(classes.noChildren)

        const sectionEl = (
          <div className={ sectionClasses.join(' ') } key={ `c-${categoryIndex}_s-${sectionIndex}` }>
            <span
              name={ section.section_name }
              data-category_index={ categoryIndex }
              data-section_index={ sectionIndex }
              onClick={ selectSection }
            >
              { section.section_name }
            </span>
            { sectionItems }
          </div>
        )

        sections.push(sectionEl)
        // reset for each loop
        sectionItems = [];

      })
    }

    const categoryEl = (
      <div className={ classes.category } key={ `c-${categoryIndex}` }>
        <div className={ classes.headingContainer }>
          <span name={ category.category_name } >{ category.category_name }</span>
          {/* if there are filters/ ategories selected and if is first category (so have only one button at the top) */ }
          { props.selectedFiltersArr && props.selectedFiltersArr.length > 0 && categoryIndex === 0 ? <Button icon={ <CloseIcon /> } name='Clear Selection' onClick={ clearCategories } /> : null }
        </div>
        <div className={ classes.sectionContainer }>
          { sections }
        </div>
      </div>
    )

    categoriesElArr.push(categoryEl)

  })


  // receives what was clicked in the filters on home page
  // and selects that on the project page
  useEffect(() => {
    if (props.context === 'projects' && props.location && props.location.state.filter) {
      const type = props.location.state.filter.type
      const el = document.querySelector(`span[name="${props.location.state.filter.name}"]`)

      if (type === 'section') selectSection(null, el)
      if (type === 'sectionItem') selectSectionItem(null, el)
    }
  }, [])

  return (
    <div className={ classes.categoriesContainer }>
      { categoriesElArr }
    </div>
  )
}

export default Categories