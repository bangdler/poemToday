import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import 'react-quill/dist/quill.snow.css';

export default React.memo(function QuillEditor({ placeholder, value, ...rest }) {
  const quill = useRef();
  const toolbarOptions = useMemo(
    () => [
      // ['link', 'image', 'video'],
      // [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    []
  );

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <div
      onClick={() => {
        quill.current.editor.focus();
      }}
    >
      <S_ReactQuill
        {...rest}
        placeholder={placeholder}
        value={value || ''}
        theme="snow"
        modules={modules}
        ref={quill}
        // formats={formats}
      />
    </div>
  );
});

const S_ReactQuill = styled(ReactQuill)`
  .ql-container {
    min-height: 300px;
    max-height: 460px;
    font-size: 1.6rem;
    font-family: 'Gamja Flower';
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
