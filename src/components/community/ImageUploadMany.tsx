import { PhotoIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';

export default function ImageUploadMany({ onImageSelect }: { onImageSelect: (imageUrl: string) => void }) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      const newImagePreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
      console.log(selectedFiles);
    }
  };

  const handleInsertImage = (imageSrc: string) => {
    if (onImageSelect) {
      onImageSelect(imageSrc); // 이미지 삽입 시 부모 컴포넌트의 onImageSelect 호출
    }
  };

  return (
    <div>
      <label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
        <div
          className={`flex flex-col mb-4 ${imagePreviews.length > 0 ? 'border-2 border-primary rounded-2xl p-3 bg-white' : ''}`}>
          {imagePreviews.length === 0 ? (
            <div className="border-primary flex justify-center items-center rounded-xl gap-2 p-4">
              <PhotoIcon className="size-5 text-neutral-400" />
              <p className="text-sm">이미지 업로드하기</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                  aria-label="이미지 선택하기"
                  className="bg-primary text-white rounded-full p-2 flex items-center">
                  <PhotoIcon className="size-5 text-white" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 overflow-auto max-h-52">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative p-1">
                    <Image
                      src={preview}
                      alt={`미리보기 ${index + 1}`}
                      width={100}
                      height={100}
                      className="aspect-square rounded-xl"
                    />
                    <button
                      onClick={() => handleInsertImage(preview)}
                      aria-label="본문에 이미지 삽입"
                      className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-lg">
                      <PlusIcon className="size-4 text-primary" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
}
