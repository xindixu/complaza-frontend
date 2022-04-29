import { useState, useCallback } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Row, Col, Button, Input, Spin, Typography } from "antd"
import { API, Storage } from "aws-amplify"
import { v4 as uuidv4 } from "uuid"
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

  const onTextSearch = useCallback(() => {
    setIsTextSearchError(false)

    if (textQuery === "") {
      setIsTextSearchError(true)
      return
    }

    router.push(`/results?q=${textQuery}`)
  }, [router, textQuery])

  const onImageSearch = useCallback(
    async (file) => {
      setIsSearching(true)
      const { type } = file
      const key = uuidv4()
      const suffix = type.split("/")[1]
      const fileName = `${key}.${suffix}`

      try {
        await Storage.put(fileName, file, {
          contentType: type,
        })

        const res = await API.get("default", `/image/${fileName}`)

        if (res.statusCode !== 200) {
          throw res
        }

        const { title } = res.body
        router.push(`/results?image=${fileName}&q=${title}`)
        setIsSearching(false)
      } catch (error) {
        console.error(error)
        setIsSearching(false)
      }
    },
    [router]
  )

  const content = (
    <div>
      <Row gutter={16}>
        <Col flex="auto">
          <Input
            status={isTextSearchError ? "error" : ""}
            placeholder="Search by text"
            value={textQuery}
            onChange={(e) => setTextQuery(e.target.value)}
            onPressEnter={onTextSearch}
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
