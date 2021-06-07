import React from "react"
import classes from "../styles/nav.module.styl"
import logo_data from "../../content/sections/logo.json"
import { Controller, Scene } from 'react-scrollmagic';
import SVG from "react-inlinesvg"
import frontPageData from "../../content/sections/front_page.json"

import About from "./About"

// add sth to do with Helmet here
const Nav = props => {

  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  const triggerElStyles = {
    position: 'absolute',
    top: '5vh'
  }

  return (

    <nav className={ classes.container }>
      {/* <span onClick={ scrollToTop }> */ }
      {/* </span> */ }

      <span className={ classes.logoGroup }>
        {/* <SVG className={ classes.logo } src={ logo_data.logo_image } /> */}
        {/* <div className={ classes.heading }>
          { frontPageData.heading }
        </div> */}
      </span>

      <div
        className={ classes.about }
        // onClick={ () => props.createModal(<About closeModal={ () => props.createModal(null) } />) }
      >
        About
      </div>

    </nav>

  )
}

export default Nav