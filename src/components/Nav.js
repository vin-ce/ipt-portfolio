import React from "react"
import { Link } from "gatsby"
import classes from "../styles/nav.module.styl"
import data from "../../content/sections/logo.json"

// add sth to do with Helmet here
const Nav = props => {
  return (
    <nav className={ classes.container }>
      <Link to="/">
        <img className={ classes.logo } src={ data.logo_image } />
      </Link>
      <div className={ classes.pageLinks }>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  )
}

export default Nav