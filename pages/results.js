import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Row, Col } from "antd"
import { API } from "aws-amplify"
import ExpandableRow from "../components/product/expandable-row"

function Result() {
  const [itemsByRetailer, setItemsByRetailer] = useState({})
  const [retailers, setRetailers] = useState([])

  const router = useRouter()
  const { q } = router.query

  useEffect(() => {
    if (!q) {
      return
    }

    API.get("default", `/search?q=${q}&sort_by=price`).then((res) => {
      if (res.statusCode !== 200) {
        console.log("error")
        return
      }

      const { items, retailers } = res.body
      setRetailers(retailers)
      setItemsByRetailer(items)
    })
  }, [q])

  return (
    <div>
      <Row wrap={false}>
        <Col flex="200px">Result for &ldquo;{q}&rdquo;</Col>
        <Col flex="auto">
          {retailers.map(({ name }) => (
            <ExpandableRow key={name} retailerName={name} items={itemsByRetailer[name]} />
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default Result
