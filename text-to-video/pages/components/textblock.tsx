import React, { useRef, useEffect, ChangeEvent } from 'react';

interface TextBlockProps {
  text: string;
  setText: (text: string) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ text, setText }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, [text]);

  return (
    <textarea
      className="h-auto resize-none overflow-hidden border border-gray-300 p-2"
      value={text}
      onChange={handleChange}
      onInput={handleInput}
      ref={textareaRef}
    />
  );
};

export default TextBlock;
