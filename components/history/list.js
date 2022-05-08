/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React from "react"
import PropTypes from "prop-types"
import NextLink from "next/link"

import { Typography, List } from "antd"

const getDateTimeString = (datetime) => {
  const d = new Date(datetime)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

function HistoryList({ items, imageUrlByKey }) {
  return (
    <List
      dataSource={items}
      renderItem={({ q, date, image }) => (
        <List.Item
          key={`${q}-${date}`}
          extra={
            image ? (
              <img width={200} alt={`uploaded image for keyword ${q}`} src={imageUrlByKey[image]} />
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
  )
}

HistoryList.propTypes = {}

export default HistoryList
