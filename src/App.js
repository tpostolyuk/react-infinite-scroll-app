import React, { useState, useRef, useCallback } from 'react';
import { useBookSearch } from './lib/hooks';
import s from './App.module.css';

export const App = () => {
  let [query, setQuery] = useState('');
  let [pageNumber, setPageNumber] = useState(1);
  
  const {
    isLoading,
    books,
    error,
    hasMore
  } = useBookSearch(query, pageNumber);
  
  const observer = useRef(null);

  const lastBookElementRef = useCallback(node => {
    if(isLoading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        console.log('Visible');
        setPageNumber(prevPage => prevPage + 1);
      }
    })
    if(node) {
      observer.current.observe(node);
    }
  }, [isLoading, hasMore]);


  const handleSearch = e => {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <div className={s.container}>
      <h1>Infinite Scroll App</h1>
      <input className={s.input} value={query} onChange={handleSearch} type="text" placeholder="Type book" />
      <div className={s.list}>
        {
          books.map((book, index) => {
            if(books.length === index + 1) {
              return <div className={s.item} ref={lastBookElementRef} key={book}>{book}</div>  
            }
            return <div className={s.item} key={book}>{book}</div>
          })
        }
        <div className={s.preloader}>{isLoading && "Loading..."}</div>
        <div>{error && "Error: "}</div>
      </div>
    </div>
  );
}
