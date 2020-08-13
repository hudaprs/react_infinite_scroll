import { useEffect, useState } from "react"
import axios from "axios"

function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((e) => (cancel = e))
    })
      .then((res) => {
        setLoading(false)
        setError(false)
        setHasMore(res.data.docs.length > 0)

        // Set the book state
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res.data.docs.map((book) => book.title)
            ])
          ]
        })
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          setLoading(false)
          setError(true)
          console.error("Request Canceled", err)
        }
      })

    return () => cancel()
    // eslint-disable-next-line
  }, [query, pageNumber])

  return { loading, error, books, hasMore }
}

export default useBookSearch
