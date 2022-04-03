import { useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Row, Col, Button, Input, Spin, Typography } from "antd"
import axios from "axios"
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
    console.log("Search by text...")
    console.log(textQuery)

    setIsTextSearchError(false)

    if (textQuery === "") {
      setIsTextSearchError(true)
      return
    }

    setIsSearching(true)
    setTimeout(() => {
      router.push(`/results?q=${textQuery}`)
      setIsSearching(false)
    }, 1000)
  }

  const onImageSearch = (file) => {
    console.log("Search by image...")

    setIsSearching(true)

    // TODO: replace these with our own endpoints & use env vars
    const config = {
      headers: {
        "Content-Type": file.type,
        "X-Api-Key": "V3PD7IU9fo5emUn60jNIl3OQUJsbC2k75Lvl7tRK",
      },
    }

    const url = `https://tg0swa682e.execute-api.us-east-1.amazonaws.com/test1/upload/cc3-photos/${file.name}`

    axios.put(url, file, config).then((response) => {
      router.push(`/results?image=`)
      setIsSearching(false)
    })
  }

  const content = (
    <div>
      <Row gutter={16}>
        <Col flex="auto">
          <Input
            status={isTextSearchError ? "error" : ""}
            placeholder="Search by text"
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

  return <main>{isSearching ? <Spin tip="Searching...">{content}</Spin> : content}</main>
}

export default Home
