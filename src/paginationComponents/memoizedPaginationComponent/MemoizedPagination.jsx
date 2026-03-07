import React, { useState, useMemo, useCallback } from 'react';
import { ITEMS_PER_PAGE } from '../constants';
import { useFetchProducts } from '../useFetchProducts';
import MemoizedProductCard from './MemoizedProductCard';

// Memoized Pagination component to prevent unnecessary re-renders
const MemoizedPagination = React.memo(function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, loading, error } = useFetchProducts();

  // Memoize calculations to avoid recomputation on every render
  const totalPages = useMemo(() => Math.ceil(data.length / ITEMS_PER_PAGE), [data.length]);
  const start = useMemo(() => currentPage * ITEMS_PER_PAGE, [currentPage]);
  const end = useMemo(() => start + ITEMS_PER_PAGE, [start]);

  // Memoize the page numbers array
  const pageNumbers = useMemo(() => [...Array(totalPages).keys()], [totalPages]);

  // Memoize the sliced data for current page
  const currentPageData = useMemo(() => data.slice(start, end), [data, start, end]);

  // Memoize the page click handler
  const handlePageClick = useCallback((pageIndex) => {
    setCurrentPage(pageIndex);
  }, []);

  return (
    <div className='main-page'>
      <h1>Memoized Pagination</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className='page-div'>
            {pageNumbers.map((i) => (
              <span
                className='page-span'
                key={i}
                onClick={() => handlePageClick(i)}
                style={{ backgroundColor: currentPage === i ? 'green' : '' }}
              >
                {i}
              </span>
            ))}
          </div>
          <div className='product-container'>
            {currentPageData.map((item) => (
              <MemoizedProductCard
                key={item.id}
                title={item.title}
                image={item.images}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

MemoizedPagination.displayName = 'MemoizedPagination';

export default MemoizedPagination;