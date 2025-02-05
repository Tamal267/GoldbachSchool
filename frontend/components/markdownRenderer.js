// components/MarkdownRender.js
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const MarkdownRender = ({ content }) => {
  if (!content) {
    return <p className="text-gray-500">No content to display.</p>
  }

  return (
    <div className="prose prose-sm w-full mx-auto">
      {' '}
      {/* Apply Tailwind prose classes */}
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // Use with caution!
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              alt={node.alt}
              className="max-w-full h-auto"
            /> // Responsive images
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            ></a>
          ),
          table: ({ node, ...props }) => (
            <table
              {...props}
              className="table-auto w-full"
            ></table> // Add Tailwind table classes
          ),
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="px-4 py-2 text-left font-bold border-b border-gray-200"
            ></th>
          ),
          td: ({ node, ...props }) => (
            <td
              {...props}
              className="px-4 py-2 border-b border-gray-200"
            ></td>
          ),
          code: ({ node, ...props }) => (
            <code
              {...props}
              className="bg-gray-100 rounded px-2 py-1 font-mono text-sm"
            ></code>
          ),
          pre: ({ node, ...props }) => (
            <pre
              {...props}
              className="bg-gray-100 rounded p-4 overflow-x-auto font-mono text-sm"
            ></pre>
          ),
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-3xl font-bold mt-6 mb-4"
            ></h1>
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-2xl font-bold mt-6 mb-4"
            ></h2>
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-xl font-bold mt-6 mb-4"
            ></h3>
          ),
          h4: ({ node, ...props }) => (
            <h4
              {...props}
              className="text-lg font-bold mt-6 mb-4"
            ></h4>
          ),
          p: ({ node, ...props }) => (
            <p
              {...props}
              className="mb-4"
            ></p>
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="list-disc ml-6 mb-4"
            ></ul>
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="list-decimal ml-6 mb-4"
            ></ol>
          ),
          li: ({ node, ...props }) => <li {...props}></li>,
        }}
      />
    </div>
  )
}

MarkdownRender.propTypes = {
  content: PropTypes.string.isRequired,
}

export default MarkdownRender
