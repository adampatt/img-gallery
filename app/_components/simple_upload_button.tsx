'use client';

import { useUploadThing } from '@/utils/uploadthing';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import { toast } from 'sonner';
import { usePostHog } from 'posthog-js/react';

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log('uploaded files', result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: 'image/*',
    },
    isUploading: $ut.isUploading,
  };
};

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner_ajPY"
      />
    </svg>
  );
}

function MakeToast() {
  return;
}

export function SimpleUploadButton() {
  const poghog = usePostHog();
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps('imageUploader', {
    onUploadBegin() {
      poghog.capture('upload_begin');
      toast(
        <div className="flex items-center gap-2 bg-black/90 text-white">
          <LoadingSpinnerSVG /> <span className="text-lg">Uploading...</span>
        </div>,
        {
          style: {
            backgroundColor: 'black',
            color: 'white',
            borderColor: 'black',
          },
          duration: 100000,
          id: 'upload-begin',
        },
      );
    },
    onClientUploadComplete() {
      toast.dismiss('upload-begin');
      toast(
        <div className="flex items-center gap-2 bg-black/90 text-white">
          <CheckIcon /> <span className="text-lg">Complete</span>
        </div>,
        {
          style: {
            backgroundColor: 'black',
            color: 'white',
            borderColor: 'black',
          },
          duration: 1000,
        },
      );
      router.refresh();
    },
  });

  return (
    <div>
      <label
        htmlFor="upload-button"
        className="cursor-pointer"
      >
        <UploadIcon />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
