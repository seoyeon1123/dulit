// @types/react-quill.d.ts
declare module 'react-quill' {
  import { Component } from 'react';

  export interface ReactQuillProps {
    value: string;
    onChange: (content: string, delta: any, source: string, editor: any) => void;
    modules?: any;
    formats?: any;
    placeholder?: string;
    theme?: string;
    style?: React.CSSProperties;
    ref?: any; // ref를 사용할 수 있도록 설정
  }

  export interface ReactQuill {
    getEditor: () => any; // getEditor 메서드 정의
  }

  export default class ReactQuill extends Component<ReactQuillProps> {
    getEditor: () => any; // 클래스 내에서 getEditor 메서드 정의
  }
}
