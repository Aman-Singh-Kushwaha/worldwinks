'use client';
import { useState } from 'react';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';
import toast from 'react-hot-toast';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      toast.error('Please select a file and enter a title.');
      return;
    }
    setIsUploading(true);
    toast('Uploading... (Not implemented yet)');
    console.log('Uploading file:', file.name, 'with title:', title);
    // TODO: Implement actual upload logic from PLAN.md (Step 4.4)
    // const compressed = await compressVideo(file);
    // const { blobId: videoBlobId } = await uploadBlob(compressed);
    // ...
    setIsUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          maxLength={100}
          required
        />
      </div>
      <div>
        <label htmlFor="video" className="block text-sm font-medium">Video File</label>
        <input
          type="file"
          id="video"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          accept="video/mp4"
          required
        />
      </div>
      <Button type="submit" disabled={isUploading} variant="primary" className="w-full">
        {isUploading ? 'Uploading...' : 'Upload Video'}
      </Button>
    </form>
  );
}
