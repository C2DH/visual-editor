import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ModuleTextAnchor, {
  FootnoteReferencePrefix,
  FootnoteDefinitionPrefix,
} from './ModuleTextAnchor'
import { Button } from 'react-bootstrap'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { useBoundingClientRect } from '../../hooks/viewport'
import { Pencil } from 'lucide-react'

const ModuleText = ({ content = '', memo, lang, className = '' }) => {
  const [bbox, ref] = useBoundingClientRect({ key: memo })
  const [mode, setMode] = useState('r')
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
      .replace(/[\\/](\d+)/g, (m, num) => `[${num}](${FootnoteReferencePrefix}/${num})`)
      // replace footnotes and their references
      .replace(/\[\^(\d+)\](:)?/g, (m, num, def) => {
        return def === undefined
          ? `[${num}](${FootnoteReferencePrefix}/${num})`
          : `[${num}](${FootnoteDefinitionPrefix}/${num})`
      }), // VERY IMPORTANT, we build FAKE footnotes! as we hve now sections.
  ]

  // var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  //   lineNumbers: true,
  //   lineWrapping: true,
  //   mode: "text/html"
  // });
  // var charWidth = editor.defaultCharWidth(), basePadding = 4;
  // editor.on("renderLine", function(cm, line, elt) {
  //   var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
  //   elt.style.textIndent = "-" + off + "px";
  //   elt.style.paddingLeft = (basePadding + off) + "px";
  // });
  // editor.refresh();

  return (
    <div ref={ref} className={`ModuleText ${className} position-relative`}>
      <Button onClick={() => setMode(mode === 'r' ? 'w' : 'r')} variant="light" size="sm">
        edit {lang} <Pencil size={16} />
      </Button>
      {mode === 'w' && (
        <CodeMirror
          value={chunks.join('\n\n')}
          height="auto"
          width={`${bbox.width}px`}
          extensions={[markdown({ jsx: true })]}
          options={{ lineWrapping: true, viewportMargin: Infinity }}
          // onChange={onChange}
        />
      )}
      {mode === 'r' && (
        <ReactMarkdown
          className="border-top border-dark pt-2 mt-2"
          components={{
            a: ModuleTextAnchor,
          }}
          remarkPlugins={[remarkGfm]}
        >
          {chunks.join('\n\n')}
        </ReactMarkdown>
      )}
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
