import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/palenight"

import Link from "./link"

export default {
  inlineCode: ({ children }) => (
    <code className="text-gray-400 bg-gray-800 px-1 rounded">{children}</code>
  ),
  h1: ({ children }) => (
    <h1 className="text-5xl font-bold leading-tight mt-12 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold leading-tight mt-12 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold leading-tight mt-12 mb-4">{children}</h3>
  ),
  blockquote: props => (
    <blockquote
      className="italic border-gray-600 text-gray-600 border-l-4 pl-4 mb-8"
      {...props}
    />
  ),
  ol: props => <ol className="list-decimal list-inside mb-8" {...props} />,
  ul: props => <ul className="list-disc list-inside mb-8" {...props} />,
  pre: ({ children: { props } }) => {
    const className = props.className || ""
    const matches = className.match(/language-(?<lang>.*)/)
    const lang =
      matches && matches.groups && matches.groups.lang
        ? matches.groups.lang
        : ""
    return (
      <Highlight
        {...defaultProps}
        code={props.children.trim()}
        language={lang}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={
              className +
              " " +
              "rounded mb-8 py-2 px-4 leading-normal scrolling-auto overflow-auto text-base"
            }
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="pr-4 opacity-25 select-none">{i + 1}</span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  },
  a: ({ url, ...props }) => (
    <Link className="text-green-500 hover:text-green-400" to={url} {...props} />
  ),
  p: props => <p className="mb-8" {...props} />,
}
