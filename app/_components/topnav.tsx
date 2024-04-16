'use client';

import { UploadButton } from '@/utils/uploadthing';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export function TopNav() {
  const router = useRouter();

  return (
    <nav className="flex w-full justify-between items-center p-4 text-xl font-semibold border-b">
      <div> Gallery </div>
      <div className="flex flex-row">
        {/* Only rendered if you are signed out */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
