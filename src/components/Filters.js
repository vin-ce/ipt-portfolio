import React from "react"
import SVG from "react-inlinesvg"

import classes from "../styles/filters.module.styl"
import data from "../../content/sections/categories.json"


const Filters = (props) => {

  // ref must be passed in full to mutate
  if (!props.activeClassRef.current) {
    props.activeClassRef.current = classes.active
    props.inDescriptionClassRef.current = classes.inDescription
  }

  let sections = [];

  data.category_items.forEach((section, sectionIndex) => {

    let sectionEl;

    sectionEl = (

      <span
        id={ `s-${sectionIndex}` }
        key={ `s-${sectionIndex}` }
        name={ section.section_name }
        className={ classes.section }
        onClick={ () => props.switchInfo(section) }
      >
        <SVG src={ section.section_icon } className={ classes.sectionIcon } />
        { section.section_name }
      </span >
    )


    sections.push(sectionEl)

  })

  return (
    <div className={ classes.filtersContainer } name="filters-container">
      <span>
        { sections }
      </span>
      {/* only show up when not home */ }
      <span
        className={ classes.home }
        name='home'
        onClick={ () => props.switchInfo({
          section_name: 'Home'
        }) }
      >
        Reset
      </span>
    </div>
  )
}

export default Filters

