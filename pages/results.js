import React from "react"
import { Row, Col } from "antd"
import ExpandableRow from "../components/product/expandable-row"

const DATA = [
  { name: "Amazon.com" },
  { name: "Ebay.com" },
  { name: "Alibaba.com" },
  { name: "Shopee.com" },
]

const Result = () => {
  return (
    <div>
      <Row wrap={false}>
        <Col flex="200px">Side bar</Col>
        <Col flex="auto">
          {DATA.map(({ name }) => (
            <ExpandableRow key={name} retailerName={name} />
          ))}
        </Col>
      </Row>
    </div>
  )
}

Result.propTypes = {}

export default Result
