import Image from 'next/image';

const mockUrls = [
  'https://utfs.io/f/51770c8c-51e4-4cfc-afc9-9766c907e9bf-vsko4n.03.00.png',
  'https://utfs.io/f/27579d1d-aaf5-44f5-b33e-eb2b30b3c454-vsko4n.02.36.png',
  'https://utfs.io/f/6968204c-f1f0-461a-91f2-0fa331a773f3-vsko4n.02.46.png',
  'https://utfs.io/f/17e716e6-b8cc-4632-8121-703c9ff2d4b9-vsko4n.02.20.png',
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
  alt: `Image ${index + 1}`,
}));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row flex-wrap gap-4">
        {[...mockImages, ...mockImages].map((image) => (
          <div
            key={image.id}
            className="w-48 gap-4"
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
