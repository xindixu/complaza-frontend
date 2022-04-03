import React from "react"
import PropTypes from "prop-types"
import { Upload } from "antd"
import { InboxOutlined } from "@ant-design/icons"

const { Dragger } = Upload

function Uploader({ onSearch }) {
  const config = {
    name: "file",
    multiple: false,
    accept: "image/*",
    listType: "picture-card",
    beforeUpload: () => false, // disable auto upload
  }

  const onChange = (info) => {
    console.log(info)

    const originalFile = info.fileList[0].originFileObj

    onSearch(originalFile)
  }

  const onDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files)
  }

  return (
    <Dragger {...config} onChange={onChange} onDrop={onDrop}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
  )
}

Uploader.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default Uploader
