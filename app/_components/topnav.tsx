import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function TopNav() {
  return (
    <nav className="flex w-full justify-between items-center p-4 text-xl font-semibold border-b">
      <div> Gallery </div>
      <div>
        {/* Only rendered if you are signed out */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
