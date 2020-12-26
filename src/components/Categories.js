import React, { useState } from "react"
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

    // reset selectedCategoriesArr
    props.setSelectedCategoriesArr([])
  }

  const sectionItemClickHandler = e => {
    if (props.context === 'projects') {

      // if no selected class
      // a1. add selected + active classes & to selectedCategoriesArr
      // a2. select parent, set to just active class & remove parent from selectedCategoriesArr
      // a3. loop through siblings
      // a4. if not selected, remove active class on siblings

      // if selected already
      // b1. remove selected + active & from selectedCategoriesArr
      // b2. loop through arr of siblings against selectedCategoriesArr to see if any siblings are selected
      // b3. if there aren't any selected, remove classes from parent el, effectively resetting that section

      // each element holds name and index information
      // to allow for easy matching of the data object to the element
      const sectionItemName = e.target.getAttribute('name')

      const categoryIndex = parseInt(e.target.getAttribute('data-category_index'))
      const sectionIndex = parseInt(e.target.getAttribute('data-section_index'))
      const sectionItemIndex = parseInt(e.target.getAttribute('data-section_item_index'))

      const parentSectionName = data.categories_list[categoryIndex].category_items[sectionIndex].section_name
      const parentSectionEl = document.querySelector(`span[name="${parentSectionName}"]`)

      // siblings of clicked section item
      const sectionItemsArr = data.categories_list[categoryIndex].category_items[sectionIndex].section_items

      const sectionIsSelected = e.target.classList.contains(classes.selected)
      const selectedCategoriesArrCopy = [...props.selectedCategoriesArr]

      // ------------------------------

      if (!sectionIsSelected) {
        // a1
        e.target.className = [classes.selected, classes.active].join(' ')
        selectedCategoriesArrCopy.push(sectionItemName)

        // a2
        parentSectionEl.className = classes.active
        let i = selectedCategoriesArrCopy.indexOf(parentSectionName)
        if (i > -1) selectedCategoriesArrCopy.splice(i, 1)

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
        e.target.className = ""
        selectedCategoriesArrCopy.splice(selectedCategoriesArrCopy.indexOf(sectionItemName), 1)

        // b2 - if there is a sibling that is selected
        let hasOtherSelected = false;
        for (let i = 0; i < sectionItemsArr.length; i++) {
          if (selectedCategoriesArrCopy.indexOf(sectionItemsArr[i].section_item_name) > -1) {
            hasOtherSelected = true;
            break;
          }
        }

        // b3
        if (!hasOtherSelected) parentSectionEl.className = ''

      }

      props.setSelectedCategoriesArr(selectedCategoriesArrCopy)



    }
  }

  const sectionClickHandler = e => {

    if (props.context === 'projects') {
      const sectionName = e.target.getAttribute('name')

      const categoryIndex = parseInt(e.target.getAttribute('data-category_index'))
      const sectionIndex = parseInt(e.target.getAttribute('data-section_index'))

      const sectionItemsArr = data.categories_list[categoryIndex].category_items[sectionIndex].section_items

      const selectedCategoriesArrCopy = [...props.selectedCategoriesArr]

      const categoryIsSelected = e.target.classList.contains(classes.selected)

      // if not yet selected:
      // a1. add selected + active classes
      // a2. loop through children section items
      // a3. turn all into active classes (removing any selected)
      // a4. remove children section items from selectedCategoriesArr

      // if already selected:
      // b1. remove classes
      // b2. remove from selectedCategoriesArr
      // // a2.
      // b3. remove classes
      // // a4.


      if (!categoryIsSelected) {
        // a1
        e.target.className = [classes.selected, classes.active].join(' ')
        selectedCategoriesArrCopy.push(sectionName)


      } else {
        // b1 - reset selected + active classes
        e.target.className = ' '

        // b2 - remove from arr
        selectedCategoriesArrCopy.splice(selectedCategoriesArrCopy.indexOf(sectionName), 1)
      }

      // a2 - going through section items
      if (sectionItemsArr) {
        sectionItemsArr.forEach(sectionItems => {
          const sectionItemEl = document.querySelector(`span[name="${sectionItems.section_item_name}"]`);

          // a3 - add active class to section items on category select
          // b3 - remove on de-select
          if (!categoryIsSelected) sectionItemEl.className = classes.active
          else sectionItemEl.className = ''

          // a4 - remove section item from selected categories array 
          const sectionItemName = sectionItemEl.getAttribute('name')
          const i = selectedCategoriesArrCopy.indexOf(sectionItemName)
          if (i > -1) selectedCategoriesArrCopy.splice(i, 1)
        })
      }


      props.setSelectedCategoriesArr(selectedCategoriesArrCopy)

      // add active+selected
      // if children

      // if selected already
      // remove active+selected
      // if children
      // remove active+selected

    }

  }


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
                  onClick={ sectionItemClickHandler }
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
              onClick={ sectionClickHandler }
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
          {/* <span name={ category.category_name } onClick={ categoryClickHandler }> */ }
          <span name={ category.category_name } >{ category.category_name }</span>
          {/* if categories have been selected and if is first category (so have only one button) */ }
          { props.selectedCategoriesArr.length > 0 && categoryIndex === 0 ? <Button icon={ <CloseIcon /> } name='Clear Selection' onClick={ clearCategories } /> : null }
        </div>
        <div className={ classes.sectionContainer }>
          { sections }
        </div>
      </div>
    )

    categoriesElArr.push(categoryEl)

  })


  return (
    <div className={ classes.categoriesContainer }>
      { categoriesElArr }
    </div>
  )
}

export default Categories