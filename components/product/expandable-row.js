import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Row, Col, Button, Typography } from "antd"
import Card from "./card"

const { Title } = Typography

const Wrapper = styled.div`
  overflow: hidden;
`
function ExpandableRow({ retailerName, items, addToWishlist, removeFromWishlist }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Wrapper>
      <Title level={3}>{retailerName}</Title>

      <Row gutter={16} wrap={isExpanded}>
        {items?.map((item) => {
          const { id, name, image, price, starred } = item
          return (
            <Col key={id} className="tw-mb-5">
              <Card
                name={name}
                image={image}
                price={price}
                retailerName={retailerName}
                starred={starred}
                addToWishlist={() => addToWishlist(item)}
                removeFromWishlist={() => removeFromWishlist(item)}
              />
            </Col>
          )
        })}
      </Row>
      <Row align="middle" justify="end">
        <Button onClick={() => setIsExpanded((prev) => !prev)}>
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
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      starred: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  addToWishlist: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
}

export default ExpandableRow
