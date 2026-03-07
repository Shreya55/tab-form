import React from 'react';
import '../pagination.css';

// Memoized ProductCard to prevent unnecessary re-renders
const MemoizedProductCard = React.memo(function ProductCard({ image, title }) {
  return (
    <div className='product-card'>
      <img src={image} alt={title} className='product-img' />
      <div>{title}</div>
    </div>
  );
});

MemoizedProductCard.displayName = 'MemoizedProductCard';

export default MemoizedProductCard;