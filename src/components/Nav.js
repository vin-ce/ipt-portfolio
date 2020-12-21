import React from "react"
import { Link } from "gatsby"
import classes from "../styles/nav.module.styl"

// add sth to do with Helmet here
const Nav = props => {
  return (
    <nav className={ classes.container }>

      <div className={ classes.pageLinks }>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  )
}

export default Nav