import Image from 'next/image';
import { db } from './server/db';
import { SignedIn, SignedOut } from '@clerk/nextjs';

async function Images() {
  const images = await db.query.images.findMany({
    // Id is incremented each time a new image is added so we are displaying newest first by ordering by id in descending order
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div>
      {images.map((image) => (
        <div
          key={image.id}
          className="flex flex-col flex-wrap gap-4"
        >
          <Image
            src={image.url}
            alt={image.url}
            width={400}
            height={400}
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
