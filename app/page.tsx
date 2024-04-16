import Image, { getImageProps } from 'next/image';
import { getUserImages } from './server/queries';
import { SignedIn, SignedOut } from '@clerk/nextjs';

async function Images() {
  const images = await getUserImages();
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="flex h-48 w-48 flex-col"
        >
          <Image
            src={image.url}
            alt={image.name}
            width={192}
            height={192}
          />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <div>
          <h1 className="text-4xl font-bold">Welcome to the image gallery please sign in above</h1>
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
