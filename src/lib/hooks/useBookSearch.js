import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBookSearch = (query, pageNumber) => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(false);
  let [hasMore, setHasMore] = useState(false);
  let [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks([]);
  }, [query])


  useEffect(() => {
    setIsLoading(true);
    setError(false);
    let cancel;

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setBooks(prevState => [...new Set([...prevState, ...res.data.docs.map(book => book.title)])]);
      setHasMore(!!res.data.docs.length > 0);
      setIsLoading(false);
    })
    .catch(e => {
      if(axios.isCancel(e)) return;
      setError(true);
    })

    return () => cancel();
  }, [query, pageNumber]);

  return { isLoading, error, books, hasMore };
}
