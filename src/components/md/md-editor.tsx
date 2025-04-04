import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

const MdEditor = () => {
  const [value, setValue] = useState("**Hello World!**");

  return (
      <MDEditor
        className="w-full h-screen "
        value={value}
        onChange={setValue}
        height={800}
        previewOptions={{rehypePlugins: [[rehypeSanitize]]}}
      />
  );
};

export default MdEditor;