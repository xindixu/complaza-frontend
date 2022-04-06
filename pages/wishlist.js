import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { API } from "aws-amplify"

function Wishlist(props) {
  const [items, setItems] = useState([])

  useEffect(() => {
    API.get("default", "/search").then((data) => {
      console.log(data)
    })
  }, [])

  return <div>Wishlist</div>
}

Wishlist.propTypes = {}

export default Wishlist
