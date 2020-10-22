import React, { useState, useEffect, useCallback } from 'react';
import marked from 'marked';
import './App.css';

function App() {
  const [contents, setContents] = useState('');

  const handleChange = (evt) => {
    setContents(evt.target.value);
  }

  marked.setOptions({
    gfm: true,
    breaks: true,
  })

  const setExampleText = useCallback(() => {
    setContents(
      `# This is an H1-level header
## This is an H2-level sub-header

[This is a link to Google](https://google.com)

This is an \`inline code\` example.
\`\`\`
<div>A code block</div>
\`\`\`
* A list item
* Another list item

**A bold text**
*An italic text*

> A Block Quote!

![An image](https://i.imgur.com/xJ1feGW.jpg)`
    );
  }, [setContents]);

  useEffect(() => {
    setExampleText();
  }, [setExampleText]);

  return (
    <div className="container-lg py-3">
      <Editor contents={contents} onChange={handleChange} />
      <Preview contents={contents} />
    </div>
  );
}

export default App;

function Editor({ contents, onChange }) {
  return (
    <>
      <label for="editor">Editor</label>
      <textarea
        id="editor"
        className="w-100 rounded-sm"
        value={contents}
        onChange={onChange.bind(this)}
      ></textarea>
    </>
  );
}

function Preview({ contents }) {
  return (
    <>
      <label for="preview">Previewer</label>
      <div
        id="preview"
        className="w-100 border border-success rounded-sm"
        dangerouslySetInnerHTML={{ __html: marked(contents) }}
      ></div>
    </>
  );
}
