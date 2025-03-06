import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function KeywordInput() {
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 입력 조합 중인지 체크 (IME 문제 방지)
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedInput = inputValue.trim();
      if (trimmedInput === '') return;

      const newKeyword = `# ${trimmedInput}`;
      // 중복 체크 및 최대 10개 제한
      if (!keywords.includes(newKeyword)) {
        if (keywords.length < 10) {
          setKeywords([...keywords, newKeyword]);
          setInputValue(''); // 입력값 초기화
        } else {
          alert('키워드는 최대 10개까지 입력 가능합니다.');
        }
      }
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  return (
    <div>
      <p className="text-sm text-neutral-500 mb-1">
        <strong className="text-lg">﹟</strong> 우리 여정의 키워드를 입력해주세요
      </p>
      <input
        name="keyword"
        type="text"
        placeholder="키워드를 입력하세요"
        value={inputValue}
        className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1
        focus:ring-primary focus:border-primary transition duration-300 ease-in-out w-full "
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="mt-3 flex flex-wrap gap-2 max-h-56 overflow-hidden">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="px-3 py-1 bg-primary bg-opacity-80 text-white rounded-full text-sm flex items-center gap-1">
            {keyword}
            <button
              onClick={() => removeKeyword(keyword)}
              className="ml-1 text-xs bg-red-500 bg-opacity-70 rounded-full p-1">
              <XMarkIcon className="text-white size-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
