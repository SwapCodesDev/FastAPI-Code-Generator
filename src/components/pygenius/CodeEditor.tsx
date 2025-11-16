"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Textarea } from "@/components/ui/textarea";

export const CodeEditor = React.memo(({ value, onChange, placeholder, disabled }: { value: string, onChange: (value: string) => void, placeholder: string, disabled: boolean }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = `${value.substring(0, start)}\t${value.substring(end)}`;
      onChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const currentLineStart = text.lastIndexOf('\n', start - 1) + 1;
      const currentLine = text.substring(currentLineStart, start);
      const indentationMatch = currentLine.match(/^\s*/);
      const indentation = indentationMatch ? indentationMatch[0] : '';
      
      const newValue = `${text.substring(0, start)}\n${indentation}${text.substring(end)}`;
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + indentation.length;
      }, 0);
    }
  };
  
  return (
    <div className="relative font-mono text-sm rounded-md border bg-card p-2.5">
      <SyntaxHighlighter
        language="python" 
        style={vscDarkPlus} 
        customStyle={{ margin: 0, padding: 0, backgroundColor: 'transparent', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflow: 'hidden' }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {value + ' '}
      </SyntaxHighlighter>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="absolute inset-0 z-10 bg-transparent text-transparent caret-white resize-none border-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-2.5"
        disabled={disabled}
        spellCheck={false}
      />
      {!value && <div className="absolute inset-0 flex items-start justify-start text-muted-foreground p-2.5 pointer-events-none -z-10">{placeholder}</div>}
    </div>
  );
});
CodeEditor.displayName = 'CodeEditor';
