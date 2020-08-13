import React, { useState, useCallback, useRef } from "react"
import "./App.css"

import useBookSearch from "./useBookSearch"

function App() {
  const [query, setQuery] = useState("")
  const [pageNumber, setPageNumber] = useState(1)

  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber)

  // Check if user has arrive in the last element / data in the screen
  const observer = useRef()
  const lastBookElement = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevNumber) => prevNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  function onChange(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <>
      <input type='text' onChange={onChange} value={query} />
      {books &&
        books.map((book, index) => (
          <p key={index} ref={lastBookElement}>
            {book}
          </p>
        ))}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </>
  )
}

export default App
