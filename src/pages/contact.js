import React from "react"
import Layout from "../components/Layout"
import classes from "../styles/contact.module.styl"

const Contact = props => {

  return (
    <Layout>
      <h1>Contact</h1>
      <p>Get in touch by emailing us at:{ ' ' }
        <a className={ classes.email } href="mailto:sean.wang@iptcreative.co.nz">sean.wang@iptcreative.co.nz</a>.
      </p>
    </Layout>
  )
}

export default Contact

