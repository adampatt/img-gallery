import React from 'react';

export default function ImagePage({ params: { id: photoId } }: { params: { id: string } }) {
  return <div>{photoId}</div>;
}
