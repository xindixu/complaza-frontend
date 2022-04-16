import React from "react"
import PropTypes from "prop-types"
import Image from "next/image"
import { Card, Button, Row, Col } from "antd"
import { StarOutlined, StarFilled } from "@ant-design/icons"

const { Meta } = Card
function ProductCard({
  name,
  price,
  image,
  retailerName,
  starred,
  addToWishlist,
  removeFromWishlist,
}) {
  return (
    <Card style={{ width: 240 }} cover={<Image alt={name} src={image} width={240} height={240} />}>
      <Meta
        title={`$ ${price}`}
        description={
          <div>
            <strong>{name}</strong>
            <Row>
              <Col flex="auto">View in {retailerName}</Col>
              <Col>
                {starred ? (
                  <Button icon={<StarFilled />} shape="circle" onClick={removeFromWishlist} />
                ) : (
                  <Button icon={<StarOutlined />} shape="circle" onClick={addToWishlist} />
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
  image: PropTypes.string.isRequired,
  retailerName: PropTypes.string.isRequired,
  addToWishlist: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
}

export default ProductCard
