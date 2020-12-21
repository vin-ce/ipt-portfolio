import React from "react"
import Nav from "./Nav"

// add sth to do with Helmet here
const Layout = props => {
  return (
    <div>
      <Nav />
      {props.children }
    </div>
  )
}

export default Layout