import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../scss/components/_search-bar.scss'

const SearchBar = () => {
  return (
    <div className="search-bar-wrapper">
      <Form className="search-bar-container">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="搜尋..."
            className="search-input"
          />
          <Button
            variant="outline-secondary"
            className="search-button"
          ><FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default SearchBar