import React from 'react';
import { getImage } from '../../../server/queries';
export default async function ImageModal({ params: { id: photoId } }: { params: { id: string } }) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error('Invalid ID');
  }

  const image = await getImage(idAsNumber);
  return (
    <div>
      <img
        className="w-96"
        src={image.url}
        alt={image.name}
      />
    </div>
  );
}
