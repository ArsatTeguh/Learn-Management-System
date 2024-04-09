'use client';

import React from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import Toast from '@/lib/toast';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export function FileUpload({ onChange, endpoint }: FileUploadProps) {
  return (
    <UploadDropzone
      className=" ut-label:text-lg !ut-button:bg-black ut-allowed-content:ut-uploading:text-red-300"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        Toast({ status: 'error', message: error.message });
      }}
    />
  );
}
