import React from 'react';
import CardSkeleton from './PostSkeleton';

const LoadingSkeleton = () => (
  <React.Fragment>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </React.Fragment>
);

export default LoadingSkeleton;
