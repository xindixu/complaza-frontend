import React from "react"
import PropTypes from "prop-types"
import { Row, Col, Typography, Button, Input } from "antd"

const { Text } = Typography

function SearchBar({ isError, query, setQuery, onSearch, onClear }) {
  return (
    <Row gutter={16} className="tw-mb-5">
      <Col flex="auto">
        <Input
          status={isError ? "error" : ""}
          placeholder="Search by text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={onSearch}
        />
        {isError && <Text type="danger">Please enter some text</Text>}
      </Col>
      <Col flex="64px">
        <Button type="primary" onClick={onSearch}>
          Search
        </Button>
      </Col>
      <Col flex="64px">
        <Button type="default" onClick={onClear} disabled={query === ""}>
          Clear
        </Button>
      </Col>
    </Row>
  )
}

SearchBar.propTypes = {
  isError: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default SearchBar
