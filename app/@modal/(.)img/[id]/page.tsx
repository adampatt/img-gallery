import React from 'react';
import { Modal } from './modal';
import FullPageImageView from '@/app/components/full-image-page';

export default function ImageModal({ params: { id: photoId } }: { params: { id: string } }) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) {
    throw new Error('Invalid ID');
  }

  return (
    <div>
      <Modal>
        <FullPageImageView photoId={idAsNumber} />
      </Modal>
    </div>
  );
}
