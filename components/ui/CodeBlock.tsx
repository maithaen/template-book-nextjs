"use client";

import { useState, useRef, type ReactNode, type ReactElement, isValidElement, Children } from "react";
import { Copy, CopyCheck } from "lucide-react";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language: languageProp }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent || "";
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }
  };

  // Use provided language prop (from Shiki's data-language) or extract from className
  const extractLanguage = (): string => {
    // Use language prop first (from data-language)
    if (languageProp) return languageProp;
    
    // Check className prop
    if (className) {
      const langMatch = className.match(/language-(\w+)/);
      if (langMatch) return langMatch[1];
    }
    
    // Try to get language from child elements
    const findLanguage = (node: ReactNode): string => {
      if (!isValidElement(node)) return "";
      
      const element = node as ReactElement<{ className?: string; 'data-language'?: string; children?: ReactNode }>;
      const props = element.props;
      
      if (props['data-language']) {
        return props['data-language'];
      }
      
      if (props.className) {
        const match = props.className.match(/language-(\w+)/);
        if (match) return match[1];
      }
      
      if (props.children) {
        const childArray = Children.toArray(props.children);
        for (const child of childArray) {
          const lang = findLanguage(child);
          if (lang) return lang;
        }
      }
      
      return "";
    };
    
    return findLanguage(children);
  };
  
  const language = extractLanguage();

  return (
    <div className="code-block-wrapper">
      {/* Header with language label and copy button */}
      <div className="code-block-header">
        {language && <span className="code-block-language">{language}</span>}
        <button
          onClick={handleCopy}
          className="code-block-copy-btn"
          title={copied ? "Copied!" : "Copy code"}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <CopyCheck className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      {/* Code content */}
      <div ref={preRef} className={`code-block-pre ${className || ""}`}>
        {children}
      </div>
    </div>
  );
}
