import Image from 'next/image';
import { db } from './server/db';

export default async function Home() {
  const images = await db.query.images.findMany({
    // Id is incremented each time a new image is added so we are displaying newest first by ordering by id in descending order
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row flex-wrap gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="w-48 gap-4"
          >
            <Image
              src={image.url}
              alt={image.url}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
