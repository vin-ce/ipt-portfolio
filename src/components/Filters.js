import React, { useRef, useEffect, useState } from "react"

import classes from "../styles/filters.module.styl"
import data from "../../content/sections/categories.json"

import { Controller, Scene } from 'react-scrollmagic';


const Filters = props => {

  // forces a refresh that updates the duration in the section elements
  const [ hasElements, setHasElements ] = useState(false)
  useEffect(() => {
    if (!hasElements) setHasElements(true)
  }, [])

  // ===============
  // CREATE ELEMENTS
  // ===============

  let filtersElArr = [];

  // creating the categories, sections and section item elements
  data.categories_list.forEach((category, categoryIndex) => {

    let sections = [];
    // let sectionItems = [];


    if (category.category_items) {
      category.category_items.forEach((section, sectionIndex) => {
        let sectionItems = []

        // sectionItems put into ref to allow for callback in Scene to happen and retain the secion items on each callback

        if (section.section_items) {
          section.section_items.forEach((sectionItem, sectionItemIndex) => {

            const sectionItemEl = (
              <span className={ classes.sectionItem } key={ `c-${categoryIndex}_s-${sectionIndex}_sI-${sectionItemIndex}` }>
                { sectionItem.section_item_name }
              </span>
            )

            sectionItems.push(sectionItemEl)
          })
        }

        // pretty much obsolete as no building types filter
        const sectionClasses = [ classes.section ]
        if (sectionItems.length === 0) sectionClasses.push(classes.noChildren)


        let sectionDomEl;
        if (hasElements) sectionDomEl = document.getElementById(`c-${categoryIndex}_s-${sectionIndex}`)
        let sectionHeight = 0;

        if (sectionDomEl) sectionHeight = sectionDomEl.offsetHeight

        const sectionEl = (
          <Scene
            key={ `c-${categoryIndex}_s-${sectionIndex}` }
            classToggle={ classes.highlight }
            duration={ sectionHeight }
          >
            <div id={ `c-${categoryIndex}_s-${sectionIndex}` } className={ sectionClasses.join(' ') }>
              <span className={ classes.sectionName } >

                { section.section_name }
              </span>
              { sectionItems }
            </div >
          </Scene>
        )

        sections.push(sectionEl)
        // reset for each loop
        // sectionItems = [];

      })
    }

    const categoryEl = (
      // <div className={ classes.category } key={ `c-${categoryIndex}` }>
      // <div className={ classes.headingContainer }>
      //     <span className={ classes.categoryNameContainer } >
      //       { category.category_name }
      //     </span>

      //   </div>
      <div className={ classes.sectionContainer } key={ `c-${categoryIndex}` }>
        <Controller >
          { sections }
        </Controller>
      </div >
      // </div>
    )

    filtersElArr.push(categoryEl)
  })

  return (
    <div className={ classes.filtersContainer }>
      { filtersElArr }
    </div>
  )
}

export default Filters

