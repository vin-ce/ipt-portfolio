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

  return (

    <nav className={ classes.container }>

      <span className={ classes.logoGroup }>
        {/* <SVG className={ classes.logo } src={ logo_data.logo_image } /> */ }
        {/* <div className={ classes.heading }>
          { frontPageData.heading }
        </div> */}
      </span>

      <div name="nav-about">
        <span
          className={ classes.about }
          onClick={ e => {
            e.target.parentNode.classList.add(classes.active)

            props.switchInfo({
              section_name: 'About'
            })

          } }
        >
          About
        </span>
      </div>

    </nav>

  )
}

export default Nav