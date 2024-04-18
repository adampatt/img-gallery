import React from 'react';
import { getImage } from '@/app/server/queries';
import { clerkClient } from '@clerk/nextjs/server';

export default async function FullPageImageView(props: { photoId: number }) {
  const { photoId } = props;
  const image = await getImage(photoId);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex w-full h-full min-w-0">
      <div className="flex flex-shrink justify-center items-center">
        <img
          className="object-contain"
          src={image.url}
          alt={image.name}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col gap-2 border-l">
        <div className="text-lg p-2 border-b text-center ">{image.name}</div>
        <div className="flex flex-col px-2">
          <span>Uploaded By</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col px-2">
          <span>Created on</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
