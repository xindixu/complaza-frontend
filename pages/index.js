import { useState } from "react"
import styled from "styled-components"
import { Row, Col, Button, Input, Space } from "antd"
import Uploader from "../components/uploader"

const UploaderWrapper = styled.div`
  margin-top: 24px;
`

export default function Home() {
  const [textQuery, setTextQuery] = useState("")
  const onTextSearch = () => {
    console.log("Search by text...")
    console.log(textQuery)
  }

  const onImageSearch = () => {
    console.log("Search by image...")
  }

  return (
    <main>
      <Row gutter={16}>
        <Col flex="auto">
          <Input placeholder="Search by text" onChange={(e) => setTextQuery(e.target.value)} />
        </Col>
        <Col flex="64px">
          <Button type="primary" onClick={onTextSearch}>
            Search
          </Button>
        </Col>
      </Row>

      <UploaderWrapper>
        <Uploader onSearch={onImageSearch} />
      </UploaderWrapper>
    </main>
  )
}
