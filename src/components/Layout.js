import React from "react"
import Nav from "./Nav"
import classes from "../styles/layout.module.styl"

// add sth to do with Helmet here
const Layout = props => {
  return (
    <div className={ classes.container }>
      <Nav />
      { props.children }
    </div>
  )
}

export default Layout