'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

export default function PhotoUpload() {
  const [title, setTitle] = useState('');

  async function handleUpload(result: any) {
    if (result?.info?.public_id && title) {
      await fetch('/actions/createPhoto', {
        method: 'POST',
        body: JSON.stringify({ title, cloudinary_id: result.info.public_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      setTitle('');
      window.location.reload();
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        className="border rounded px-2 py-1"
        placeholder="Photo title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <CldUploadWidget uploadPreset="YOUR_UPLOAD_PRESET" onUpload={handleUpload}>
        {({ open }) => (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => open()}
            type="button"
          >
            Upload Photo
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
