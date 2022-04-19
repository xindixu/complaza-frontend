import React from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { Row, Col, Typography, Empty, message } from "antd"
import PriceHistory from "../../components/price-history"

const { Title } = Typography

const PRICES = {
  "2022-04-13": 1.23,
  "2022-04-14": 0.23,
  "2022-04-15": 3.23,
  "2022-04-16": 2.23,
  "2022-04-17": 1.32,
  "2022-04-18": 2.12,
  "2022-04-19": 1.23,
}

function ProductDetails(props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Title>Product: {id}</Title>
      <PriceHistory prices={PRICES} />
    </div>
  )
}

ProductDetails.propTypes = {}

export default ProductDetails
