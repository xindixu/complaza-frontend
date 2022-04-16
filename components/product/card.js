import React from "react"
import PropTypes from "prop-types"
import Image from "next/image"
import { Card, Button, Row, Col, Typography } from "antd"
import { StarOutlined, StarFilled } from "@ant-design/icons"

const { Meta } = Card
const { Link } = Typography
function ProductCard({
  addToWishlist,
  image,
  link,
  name,
  price,
  removeFromWishlist,
  retailerName,
  starred,
}) {
  return (
    <Card style={{ width: 240 }} cover={<Image alt={name} src={image} width={240} height={240} />}>
      <Meta
        title={`$ ${price}`}
        description={
          <div>
            <strong>{name}</strong>
            <Row>
              <Col flex="auto">
                <Link href={link} target="_blank">
                  View in {retailerName}
                </Link>
              </Col>
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
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
  addToWishlist: PropTypes.func.isRequired,
  retailerName: PropTypes.string.isRequired,
}

export default ProductCard
