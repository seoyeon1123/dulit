import React, { useState, useRef, useEffect } from 'react';
import ImageUploadMany from './ImageUploadMany';
import Input from '../share/Input';

export default function CommunityPostAddModal() {
  const [editorContent, setEditorContent] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);

  // const handleEditorChange = () => {
  //   if (editorRef.current) {
  //     setEditorContent(editorRef.current.innerHTML);
  //   }
  // };

  const insertImage = (imageUrl: string) => {
    const editor = editorRef.current;
    if (editor) {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.style.maxWidth = '100%';
      editor.appendChild(imageElement); // 이미지 삽입
      setEditorContent(editor.innerHTML); // 상태 업데이트
    }
  };

  // editorContent가 변경될 때마다 editorRef의 내용을 업데이트
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorContent;
    }
  }, [editorContent]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-6 rounded-lg shadow-lg relative w-96 flex flex-col gap-5">
        <div className="flex flex-row gap-3 items-center">
          <p className="rounded-2xl border-2 border-primary px-2 py-1 text-primary bg-white text-sm">글 유형</p>
          <label>
            <input type="radio" name="category" value="Date" /> 데이트
          </label>
          <label>
            <input type="radio" name="category" value="Travel" /> 여행
          </label>
        </div>
        <Input name="CommunityPostTitle" type="text" placeholder="제목을 입력해주세요." />

        {/* Content editable div */}
        <div
          ref={editorRef}
          contentEditable={true}
          //onInput={handleEditorChange}
          className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 ease-in-out w-full min-h-36 relative"
        />

        {/* ImageUploadMany 컴포넌트로 onImageSelect prop 전달 */}
        <ImageUploadMany onImageSelect={insertImage} />
      </div>
    </div>
  );
}
