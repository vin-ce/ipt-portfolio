import React, { useEffect } from "react"
import Nav from "./Nav"
import classes from "../styles/layout.module.styl"
import { Helmet } from "react-helmet"
// import SmoothScroll from "./SmoothScroll"

// add sth to do with Helmet here
const Layout = props => {

  

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap" rel="stylesheet" />
      </Helmet>
      {/* <SmoothScroll>
      </SmoothScroll> */}
      <div className={ classes.container }>
        { props.children }
      </div>
    </>
  )
}

export default Layout