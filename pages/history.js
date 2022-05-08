/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useContext, useCallback } from "react"
import { API, Storage } from "aws-amplify"
import qs from "qs"
import { Typography, List } from "antd"
import NextLink from "next/link"
import AuthContext from "../context/auth"
import withProtectedRoute from "../components/protected-route"

const { Title } = Typography

const getDateTimeString = (datetime) => {
  const d = new Date(datetime)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

const parseImageUrls = (imageUrls) =>
  imageUrls.reduce((memo, { url, image }) => {
    memo[image] = url
    return memo
  }, {})

function History() {
  const [items, setItems] = useState([])
  const [imageUrlByKey, setImageUrlByKey] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { userId, token } = useContext(AuthContext)

  const queryFromHistory = useCallback(
    async (query) => {
      if (!userId || !token) {
        return
      }
      setIsLoading(true)
      const params = {
        q: query,
      }
      const link = query
        ? `/search/history/${userId}?${qs.stringify(params)}`
        : `/history/${userId}`

      const res = await API.get("default", link, {
        headers: {
          Authorization: token,
        },
      })

      if (res.statusCode !== 200) {
        return
      }

      const { items } = res.body
      setItems(items)

      const imageUrls = await Promise.all(
        items.map(({ image }) => Storage.get(image).then((url) => ({ url, image })))
      )

      setImageUrlByKey(parseImageUrls(imageUrls))
      setItems(items)
      setIsLoading(false)
    },
    [token, userId]
  )

  useEffect(() => {
    queryFromHistory()
  }, [queryFromHistory, token, userId])

  return (
    <div>
      <Title>History</Title>
      <List
        dataSource={items}
        renderItem={({ q, date, image }) => (
          <List.Item
            key={`${q}-${date}`}
            extra={
              image ? (
                <img
                  width={200}
                  alt={`uploaded image for keyword ${q}`}
                  src={imageUrlByKey[image]}
                />
              ) : null
            }
          >
            <List.Item.Meta
              title={
                <NextLink
                  href={image ? `/results?image=${image}&q=${q}` : `/results?q=${q}`}
                  passHref
                >
                  {q}
                </NextLink>
              }
              description={getDateTimeString(date)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default withProtectedRoute(History)
