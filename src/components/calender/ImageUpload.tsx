import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../share/Button';

export default function ImageUpload() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log(selectedFile);

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {};

  return (
    <div>
      <label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        <div className="mb-4">
          {imagePreview ? (
            <Image src={imagePreview} alt="미리보기" width={400} height={400} className="aspect-square rounded-xl " />
          ) : (
            <div className="w-full h-full border-2 border-dotted aspect-square border-primary flex justify-center items-center rounded-xl">
              <PhotoIcon className="size-12 text-neutral-400" />
            </div>
          )}
        </div>
      </label>
      <Button describe="이미지 업로드" handleSubmit={handleSubmit} />
    </div>
  );
}
