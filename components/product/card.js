import React from "react"
import PropTypes from "prop-types"
import Image from "next/image"
import { Card, Button, Row, Col } from "antd"
import { StarOutlined, StarFilled } from "@ant-design/icons"

const { Meta } = Card
function ProductCard({ name, price, imageUrl, retailerName, starred }) {
  return (
    <Card
      style={{ width: 240 }}
      className="mb-5"
      cover={<Image alt={name} src={imageUrl} width={240} height={240} />}
    >
      <Meta
        title={`$ ${price}`}
        description={
          <div>
            <strong>{name}</strong>
            <Row>
              <Col flex="auto">View in {retailerName}</Col>
              <Col>
                {starred ? (
                  <Button icon={<StarFilled />} shape="circle" />
                ) : (
                  <Button icon={<StarOutlined />} shape="circle" />
                )}
              </Col>
            </Row>
          </div>
        }
      />
    </Card>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  retailerName: PropTypes.string.isRequired,
}

export default ProductCard
