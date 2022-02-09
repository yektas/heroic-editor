import dynamic from "next/dynamic";
import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

if (typeof navigator !== "undefined") {
  require("codemirror/mode/markdown/markdown");
}

type Props = {
  input: string;
  setInput: Function;
};

const Editor = (props: Props) => {
  return (
    <CodeMirror
      value={props.input}
      options={{
        mode: "markdown",
        theme: "paraiso-light",
        lineNumbers: true,
        lineWrapping: true,
        viewportMargin: Infinity,
      }}
      onBeforeChange={(editor, data, value) => {
        props.setInput(value);
      }}
      onDrop={(editor, event) => {
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          let file = files[0];
          const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "heroic_editor_preset");

          fetch(url, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              return response.text();
            })
            .then((data: any) => {
              let doc = editor.getDoc();
              editor.setCursor(
                editor.coordsChar({ left: event.pageX, top: event.pageY })
              );
              doc.replaceRange(
                `![${file.name}](${JSON.parse(data).secure_url})`,
                editor.getCursor()
              );
            });
        }
      }}
    />
  );
};

export default Editor;
