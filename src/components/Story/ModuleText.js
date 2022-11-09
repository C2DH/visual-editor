import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ModuleTextAnchor, {
  FootnoteReferencePrefix,
  FootnoteDefinitionPrefix,
} from './ModuleTextAnchor'
import { Form } from 'react-bootstrap'

const ModuleText = ({ content = '', lang, className = '' }) => {
  let chunks = [
    content
      // replace image spec {width= ...} (sic)
      .replace(/\{width=[^}]+\}/g, '')
      // replace {.smallcaps}
      .replace(/\[([^\]]+)\]\{\.[^}]+\}/g, (m, t) => t)
      // replace {.underline} mentions (sic)
      .replace(/\{\.[^}]+\}/g, '')
      // replace weird list item: e:g am\n29. Juli 1947 MUST NOT BE A LIST
      .replace(/([^.])\n(\d+)\./g, (m, dot, num) => `. ${num}.`)
      // replace /1 with [^1]
      .replace(
        /[\\/](\d+)/g,
        (m, num) => `[${num}](${FootnoteReferencePrefix}/${num})`
      )
      // replace footnotes and their references
      .replace(/\[\^(\d+)\](:)?/g, (m, num, def) => {
        return def === undefined
          ? `[${num}](${FootnoteReferencePrefix}/${num})`
          : `[${num}](${FootnoteDefinitionPrefix}/${num})`
      }), // VERY IMPORTANT, we build FAKE footnotes! as we hve now sections.
  ]
  return (
    <div className={`ModuleText ${className}`}>
      <b>{lang}</b>
      <ReactMarkdown
        className='border-top border-dark pt-2 mt-2'
        components={{
          a: ModuleTextAnchor,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {chunks.join('\n\n')}
      </ReactMarkdown>
    </div>
  )
  // <div>

  // </div>
  // return (
  //   <Form.Group className='me-3'>
  //     <Form.Label> {lang}</Form.Label>
  //     <Form.Control as='textarea' value={content} rows={2} />
  //   </Form.Group>
  // )
}

export default ModuleText
