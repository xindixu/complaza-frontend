import React from "react"
import PropTypes from "prop-types"
import Image from "next/image"
import { Card, Button, Row, Col } from "antd"
import { StarOutlined } from "@ant-design/icons"

const { Meta } = Card
const ProductCard = ({ name, price, imageUrl, retailerName }) => {
  return (
    <Card
      style={{ width: 240, marginBottom: "24px" }}
      cover={
        <div style={{ width: "100%" }}>
          <Image alt={name} src={imageUrl} width={240} height={240} />
        </div>
      }
    >
      <Meta
        title={price}
        description={
          <div>
            <strong>{name}</strong>
            <Row>
              <Col flex="auto">View in {retailerName}</Col>
              <Col>
                <Button icon={<StarOutlined />} shape="circle" />{" "}
              </Col>
            </Row>
          </div>
        }
      />
    </Card>
  )
}

ProductCard.propTypes = {}

export default ProductCard
