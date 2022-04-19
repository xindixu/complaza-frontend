import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Typography } from "antd"
import { API } from "aws-amplify"
import Detail from "../../components/product/detail"
import PriceHistory from "../../components/price-history"

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
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [priceHistory, setPriceHistory] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    API.get("default", `/product/${id}`).then((res) => {
      const { statusCode, body } = res

      if (statusCode !== 200) {
        return
      }

      if (!body) {
        return
      }

      setProduct(body.product)
      setPriceHistory(body.price_history)
      setIsLoading(false)
    })
  }, [id])

  if (isLoading || !product || !priceHistory) {
    return "loading"
  }

  const { image, link, name, price, retailer } = product
  return (
    <>
      <Detail
        image={image}
        link={link}
        name={name}
        price={price}
        retailer={retailer}
        priceHistory={PRICES}
      />
      <PriceHistory prices={PRICES} />
    </>
  )
}

ProductDetails.propTypes = {}

export default ProductDetails
