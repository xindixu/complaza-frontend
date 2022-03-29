import React from "react"
import PropTypes from "prop-types"
import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

const { Dragger } = Upload

const Uploader = ({ onSearch }) => {
  const config = {
    name: "file",
    multiple: false,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  }

  const onChange = (info) => {
    const { status } = info.file
    if (status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`)

      onSearch()
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
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
