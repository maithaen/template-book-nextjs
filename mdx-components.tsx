import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";

// Named function that follows Next.js MDX convention but also provides an alias
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with IDs for scroll tracking
    h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => {
      const id = typeof children === "string" 
        ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        : undefined;
      return <h1 id={id} {...props}>{children}</h1>;
    },
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
      const id = typeof children === "string"
        ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        : undefined;
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => {
      const id = typeof children === "string"
        ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        : undefined;
      return <h3 id={id} {...props}>{children}</h3>;
    },
    h4: ({ children, ...props }: ComponentPropsWithoutRef<"h4">) => {
      const id = typeof children === "string"
        ? children.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        : undefined;
      return <h4 id={id} {...props}>{children}</h4>;
    },
    // Code block with copy button
    pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) => {
      // Extract className from the code child element
      const codeElement = children as ReactElement<{ className?: string }>;
      const className = codeElement?.props?.className;
      // Shiki adds data-language to the pre element
      const dataLanguage = props["data-language"];
      return (
        <CodeBlock className={className} language={dataLanguage} {...props}>
          {children}
        </CodeBlock>
      );
    },
    // Tables
    table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
      <div className="overflow-x-auto my-4">
        <table {...props}>{children}</table>
      </div>
    ),
    // Images with lazy loading
    img: (props: ComponentPropsWithoutRef<"img">) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img loading="lazy" alt="" {...props} />
    ),
    // Links with external indicator
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
          {isExternal && <span className="ml-1">↗</span>}
        </a>
      );
    },
    ...components,
  };
}

// Alias for use in server components (avoids hooks lint rule)
export const getMDXComponents = useMDXComponents;
