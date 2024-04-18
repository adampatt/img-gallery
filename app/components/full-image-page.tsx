import React from 'react';
import { getImage } from '@/app/server/queries';

export default async function FullPageImageView(props: { photoId: number }) {
  const { photoId } = props;
  const image = await getImage(photoId);
  return (
    <img
      className="w-96"
      src={image.url}
      alt={image.name}
    />
  );
}
