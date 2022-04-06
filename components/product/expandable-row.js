import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Row, Col, Button, Typography } from "antd"
import Card from "./card"

const { Title } = Typography

const DATA = [
  { id: "1", name: "Kitty 1", imageUrl: "https://loremflickr.com/200/200", price: "50.4" },
  { id: "2", name: "Kitty 2", imageUrl: "https://loremflickr.com/200/200", price: "20.4" },
  { id: "3", name: "Kitty 3", imageUrl: "https://loremflickr.com/200/200", price: "54.2" },
  { id: "4", name: "Kitty 4", imageUrl: "https://loremflickr.com/200/200", price: "50.6" },
  { id: "5", name: "Kitty 5", imageUrl: "https://loremflickr.com/200/200", price: "35.09" },
  { id: "6", name: "Kitty 1", imageUrl: "https://loremflickr.com/200/200", price: "50.4" },
  { id: "7", name: "Kitty 2", imageUrl: "https://loremflickr.com/200/200", price: "20.4" },
  { id: "8", name: "Kitty 3", imageUrl: "https://loremflickr.com/200/200", price: "54.2" },
  { id: "9", name: "Kitty 4", imageUrl: "https://loremflickr.com/200/200", price: "50.6" },
  { id: "10", name: "Kitty 5", imageUrl: "https://loremflickr.com/200/200", price: "35.09" },
  { id: "11", name: "Kitty 1", imageUrl: "https://loremflickr.com/200/200", price: "50.4" },
  { id: "12", name: "Kitty 2", imageUrl: "https://loremflickr.com/200/200", price: "20.4" },
  { id: "13", name: "Kitty 3", imageUrl: "https://loremflickr.com/200/200", price: "54.2" },
  { id: "14", name: "Kitty 4", imageUrl: "https://loremflickr.com/200/200", price: "50.6" },
  { id: "15", name: "Kitty 5", imageUrl: "https://loremflickr.com/200/200", price: "35.09" },
  { id: "16", name: "Kitty 1", imageUrl: "https://loremflickr.com/200/200", price: "50.4" },
  { id: "17", name: "Kitty 2", imageUrl: "https://loremflickr.com/200/200", price: "20.4" },
  { id: "18", name: "Kitty 3", imageUrl: "https://loremflickr.com/200/200", price: "54.2" },
  { id: "19", name: "Kitty 4", imageUrl: "https://loremflickr.com/200/200", price: "50.6" },
  { id: "20", name: "Kitty 5", imageUrl: "https://loremflickr.com/200/200", price: "35.09" },
]

const Wrapper = styled.div`
  overflow: hidden;
`
function ExpandableRow({ retailerName }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Wrapper>
      <Title level={3}>{retailerName}</Title>

      <Row gutter={16} wrap={isExpanded}>
        {DATA.map(({ id, name, imageUrl, price }) => (
          <Col key={id}>
            <Card name={name} imageUrl={imageUrl} price={price} retailerName={retailerName} />
          </Col>
        ))}
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
}

export default ExpandableRow
