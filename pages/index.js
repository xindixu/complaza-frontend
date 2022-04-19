import { useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Row, Col, Button, Input, Spin, Typography } from "antd"
import axios from "axios"
import { API } from "aws-amplify"
import Uploader from "../components/uploader"

const { Text } = Typography

const UploaderWrapper = styled.div`
  margin-top: 24px;
`

function Home() {
  const [textQuery, setTextQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isTextSearchError, setIsTextSearchError] = useState(false)
  const [isImageSearchError, setIsImageSearchError] = useState(false)

  const router = useRouter()

  const onTextSearch = () => {
    setIsTextSearchError(false)

    if (textQuery === "") {
      setIsTextSearchError(true)
      return
    }

    router.push(`/results?q=${textQuery}`)
  }

  const onImageSearch = (file) => {
    setIsSearching(true)

    const reader = new FileReader()
    reader.onloadend = () => {
      const body = reader.result.split(",")[1]
      const { type } = file

      API.post("default", "/image", {
        // FIXME: Currently only support jpg and jpeg
        headers: { "Content-Type": type },
        body,
      }).then((res) => {
        // TODO: wait until backend returns keywords
        const { key, bucket, title } = res
        router.push(`/results?image=${key}&bucket=${bucket}&q=${title}`)
        setIsSearching(false)
      })
    }
    reader.readAsDataURL(file)
  }

  const content = (
    <div>
      <Row gutter={16}>
        <Col flex="auto">
          <Input
            status={isTextSearchError ? "error" : ""}
            placeholder="Search by text"
            value={textQuery}
            onChange={(e) => setTextQuery(e.target.value)}
          />
          {isTextSearchError && <Text type="danger">Please enter some text</Text>}
        </Col>
        <Col flex="64px">
          <Button type="primary" onClick={onTextSearch}>
            Search
          </Button>
        </Col>
      </Row>

      <UploaderWrapper>
        <Uploader onSearch={onImageSearch} />
        {isImageSearchError && <Text type="danger">Please upload a picture</Text>}
      </UploaderWrapper>
    </div>
  )

  return <main>{isSearching ? <Spin tip="Processing image...">{content}</Spin> : content}</main>
}

export default Home
