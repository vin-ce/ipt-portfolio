import React, { useEffect, useState } from "react"
import SVG from "react-inlinesvg"

import classes from "../styles/filters.module.styl"
import data from "../../content/sections/categories.json"

import { Controller, Scene } from 'react-scrollmagic';

import SectionDescription from "./SectionDescription"

const Filters = (props) => {


  let sections = [];

  data.category_items.forEach((section, sectionIndex) => {

    let sectionEl;

    sectionEl = (

      <span id={ `s-${sectionIndex}` } key={ `s-${sectionIndex}` } name={section.section_name} className={ classes.section }>
        <span className={ classes.sectionName }
          // onClick={ () => createModal(<SectionDescription data={ section } closeModal={ () => createModal(null) } />) }
          onClick={ () => props.switchInfo(section) }
        >
          <SVG src={ section.section_icon } className={ classes.sectionIcon } />

          { section.section_name }
        </span>
      </span >
    )


    sections.push(sectionEl)

  })

  return (
    <div className={ classes.filtersContainer }>
      <span>
        { sections }
      </span>
      {/* only show up when not home */}
      <span className={classes.home} name='home'>Home</span>
    </div>
  )
}

export default Filters

