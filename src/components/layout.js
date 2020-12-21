import React from "react"

const Layout = props => {

  // add sth to do with Helmet here
  return (
    <div>
      Layout
      {props.children }
    </div>
  )
}

export default Layout