import React from "react"
import classes from "../styles/nav.module.styl"
import logo_data from "../../content/sections/logo.json"
import { Controller, Scene } from 'react-scrollmagic';
import SVG from "react-inlinesvg"

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
    <>
      <div id='navTriggerEl' style={ triggerElStyles } />
      <Controller>
        <Scene
          classToggle={ classes.mute }
          triggerHook="onLeave"
          triggerElement="#navTriggerEl"
        >
          <nav className={ classes.container }>
            <span onClick={ scrollToTop }>
              <SVG className={ classes.logo } src={ logo_data.logo_image } />
            </span>

            <div
              className={ classes.about }
              onClick={ () => props.createModal(<About closeModal={ () => props.createModal(null) } />) }
            >
              About
              {/* <span className={ classes.inTouch }>Get in touch</span> by emailing us at:
              <br />
              <a className={ classes.email } href="mailto:sean.wang@iptcreative.co.nz">sean.wang@iptcreative.co.nz</a>. */}

            </div>

          </nav>
        </Scene>
      </Controller>
    </>
  )
}

export default Nav