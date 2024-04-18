import React from 'react';
import { getImage } from '@/app/server/queries';

export default async function FullPageImageView(props: { photoId: number }) {
  const { photoId } = props;
  const image = await getImage(photoId);
  return (
    <div className="flex w-full h-full min-w-0">
      <div className="flex-shrink flex justify-center items-center">
        <img
          className="object-contain"
          src={image.url}
          alt={image.name}
        />
      </div>
      <div className="w-48 flex flex-col flex-shrink-0 border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
