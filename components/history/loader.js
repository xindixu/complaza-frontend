import React from "react"
import styled from "styled-components"
import { List, Skeleton, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ITEM = {
  q: "",
  date: "",
  image: "",
}

function Loader() {
  return (
    <List
      dataSource={[...new Array(20).keys()].map(() => ({ ...ITEM, image: Math.random() > 0.7 }))}
      renderItem={({ image }, index) => (
        <List.Item
          key={index}
          extra={
            image ? (
              <Wrapper>
                <Spin
                  size="large"
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 64, color: "rgba(129, 129, 129, 0.24)" }}
                      spin
                    />
                  }
                />
              </Wrapper>
            ) : null
          }
        >
          <List.Item.Meta
            title={<Skeleton.Input active size="medium" />}
            description={<Skeleton.Input active size="small" />}
          />
        </List.Item>
      )}
    />
  )
}

export default Loader
