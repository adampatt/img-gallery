'use client';

import { UploadButton } from '@/utils/uploadthing';
import { SimpleUploadButton } from './simple_upload_button';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export function TopNav() {
  const router = useRouter();

  return (
    <nav className="flex w-full justify-between items-center p-4 text-xl font-semibold border-b">
      <div> Gallery </div>
      <div className="flex flex-row gap-4 items-center">
        {/* Only rendered if you are signed out */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
