import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";

type Props = {
  content: string;
};

const Renderer = (props: Props) => {
  return (
    <ReactMarkdown
      children={props.content}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              showLineNumbers={true}
              children={String(children).replace(/\n$/, "")}
              style={okaidia}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default Renderer;
