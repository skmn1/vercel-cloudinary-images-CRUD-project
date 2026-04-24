import React, { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { getImages, addImage, updateImageName, deleteImage } from './actions/imageActions';

export default async function Page() {
  const images = await getImages();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Image Manager</h1>
        <UploadSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {images.map((img: any) => (
            <ImageCard key={img.id} img={img} />
          ))}
        </div>
      </div>
    </main>
  );
}

function UploadSection() {
  const [name, setName] = useState('');
  return (
    <CldUploadWidget
      uploadPreset="YOUR_UPLOAD_PRESET"
      onUpload={async (result: any) => {
        if (result?.info?.public_id && name) {
          await addImage({ display_name: name, cloudinary_id: result.info.public_id });
          window.location.reload();
        }
      }}
    >
      {({ open }) => (
        <div className="flex gap-2 items-center">
          <input
            className="border rounded px-2 py-1"
            placeholder="Image name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => open()}
            type="button"
          >
            Upload Image
          </button>
        </div>
      )}
    </CldUploadWidget>
  );
}

function ImageCard({ img }: { img: any }) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(img.display_name);

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <CldImage
        width={300}
        height={200}
        src={img.cloudinary_id}
        alt={img.display_name}
        className="rounded mb-2"
      />
      {editing ? (
        <form
          className="flex gap-2 mt-2"
          onSubmit={async e => {
            e.preventDefault();
            await updateImageName(img.id, newName);
            setEditing(false);
            window.location.reload();
          }}
        >
          <input
            className="border rounded px-2 py-1"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button className="bg-green-600 text-white px-2 py-1 rounded" type="submit">Save</button>
          <button className="bg-gray-300 px-2 py-1 rounded" type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="font-semibold text-center w-full truncate">{img.display_name}</div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-yellow-400 px-2 py-1 rounded text-white"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <form
              action={async () => {
                await deleteImage(img.id);
                window.location.reload();
              }}
            >
              <button
                className="bg-red-600 px-2 py-1 rounded text-white"
                type="submit"
              >
                Trash
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
