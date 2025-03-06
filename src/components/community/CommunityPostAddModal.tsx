import React, { useState, useRef, useEffect } from 'react';
import ImageUploadMany from './ImageUploadMany';
import Input from '../share/Input';
import Button from '../share/Button';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useCommunityModalStore } from '@/store/CommunityModalStore';
import KeywordInput from './KeywordInput';

export default function CommunityPostAddModal() {
  const [editorContent, setEditorContent] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);
  const { closeModal } = useCommunityModalStore();

  const insertImage = (imageUrl: string) => {
    const editor = editorRef.current;
    if (editor) {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.style.maxWidth = '50%';
      imageElement.style.height = 'auto';
      editor.appendChild(imageElement); // 이미지 삽입
      setEditorContent(editor.innerHTML); // 상태 업데이트
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorContent;
    }
  }, [editorContent]);

  const handleSubmit = () => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-secondary p-6 rounded-lg shadow-lg relative w-96 flex flex-col gap-5">
        <XCircleIcon onClick={closeModal} className="size-7 text-primary absolute top-5 right-5" />
        <div className="flex flex-row gap-3 items-center">
          <p className="rounded-2xl border-2 border-primary px-2 py-1 text-primary bg-white text-sm">Type</p>
          <label>
            <input type="radio" name="category" value="Date" /> 데이트
          </label>
          <label>
            <input type="radio" name="category" value="Travel" /> 여행
          </label>
        </div>
        <div>
          <p className="text-sm text-neutral-500 mb-1">
            우리의 여정을 한 줄 소개해주세요 <strong className="text-lg">📝</strong>
          </p>
          <Input name="CommunityPostTitle" type="text" placeholder="제목을 입력해주세요." />
        </div>

        <div>
          <p className="text-sm text-neutral-500 mb-1">
            사람들에게 우리의 데이트를 소개해볼까요? <strong className="text-lg">✈️</strong>
          </p>
          <div
            ref={editorRef}
            contentEditable={true}
            className="bg-white px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 ease-in-out w-full min-h-36 relative overflow-auto max-h-64"
          />
        </div>

        {/* ImageUploadMany 컴포넌트로 onImageSelect prop 전달 */}
        <ImageUploadMany onImageSelect={insertImage} />
        <KeywordInput />
        <Button handleSubmit={handleSubmit} describe="등록하기" />
      </div>
    </div>
  );
}
