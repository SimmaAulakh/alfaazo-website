import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-heading text-3xl font-900 text-primary-dark mb-6 mt-10 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl font-700 text-primary-dark mb-4 mt-8 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl font-700 text-primary-dark mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-warm-brown/85 text-base leading-7 mb-5">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary font-medium underline underline-offset-2 hover:text-primary-light transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-warm-brown/85">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-warm-brown/85">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-muted-sage pl-5 my-6 italic text-warm-brown/70">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-light-sand px-1.5 py-0.5 rounded text-sm font-mono text-primary-dark">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-primary-dark text-cream/90 rounded-xl p-5 mb-5 overflow-x-auto text-sm leading-6">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-primary-dark">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-warm-brown">{children}</em>
    ),
    hr: () => <hr className="border-primary/15 my-8" />,
  };
}
