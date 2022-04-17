import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Row, Col, Button, Typography, Empty } from "antd"
import Card from "./card"
import Loader from "./loader"

const { Title } = Typography

const Wrapper = styled.div`
  overflow: hidden;
`
function ExpandableRow({ retailerName, items, addToWishlist, removeFromWishlist, isSearching }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Wrapper>
      <Title level={3}>{retailerName}</Title>
      {isSearching ? (
        <Loader />
      ) : items.length === 0 ? (
        <Empty />
      ) : (
        <Row gutter={16} wrap={isExpanded}>
          {items?.map((item, index) => {
            const { id, name, image, price, starred, link } = item
            return (
              <Col key={id} className="tw-mb-5">
                <Card
                  image={image}
                  link={link}
                  name={name}
                  price={price}
                  retailerName={retailerName}
                  starred={starred}
                  addToWishlist={() => addToWishlist(item, index)}
                  removeFromWishlist={() => removeFromWishlist(item, index)}
                />
              </Col>
            )
          })}
        </Row>
      )}
      <Row align="middle" justify="end">
        <Button onClick={() => setIsExpanded((prev) => !prev)} disabled={isSearching}>
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </Row>
    </Wrapper>
  )
}

ExpandableRow.propTypes = {
  retailerName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      starred: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  addToWishlist: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
}

export default ExpandableRow
