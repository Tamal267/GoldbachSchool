import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

// (Optional) Import languages if needed
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'

// Register languages for better highlighting
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('cpp', cpp)
SyntaxHighlighter.registerLanguage('python', python)

// Custom code block renderer using react-syntax-highlighter
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  if (!inline && match) {
    return (
      <SyntaxHighlighter
        language={match[1]}
        style={codeStyle}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    )
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

// Custom iframe renderer for full-width video embeds with Tailwind's aspect-video ratio
const Iframe = ({ node, ...props }) => {
  return (
    <iframe
      {...props}
      className="w-full aspect-video"
    />
  )
}

const MarkdownRender = ({ content }) => {
  if (!content) {
    return <p className="text-gray-500">No content to display.</p>
  }

  return (
    <div className="prose prose-sm w-full mx-auto">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          code: CodeBlock,
          iframe: Iframe,
          img: ({ node, ...props }) => (
            <img {...props} alt={node.alt} className="max-w-full h-auto" />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            />
          ),
          table: ({ node, ...props }) => (
            <table {...props} className="table-auto w-full" />
          ),
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="px-4 py-2 text-left font-bold border-b border-gray-200"
            />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="px-4 py-2 border-b border-gray-200" />
          ),
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-3xl font-bold mt-6 mb-4"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-2xl font-bold mt-6 mb-4"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-xl font-bold mt-6 mb-4"
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              {...props}
              className="text-lg font-bold mt-6 mb-4"
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="mb-4" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc ml-6 mb-4" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal ml-6 mb-4" />
          ),
          li: ({ node, ...props }) => <li {...props} />,
        }}
      />
    </div>
  )
}

MarkdownRender.propTypes = {
  content: PropTypes.string.isRequired,
}

export default MarkdownRender