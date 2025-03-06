import React from 'react';
import Input from '../share/Input';

export default function Comment() {
  return (
    <div>
      <Input name="comment" type="text" placeholder="댓글을 입력해주세요" />
    </div>
  );
}
