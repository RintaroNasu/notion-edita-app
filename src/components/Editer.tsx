"use client";
import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading, { Level } from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";

export const Editor = () => {
  const [showMenu, setShowMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock,
      Placeholder.configure({
        placeholder: "ここにメモを入力してください",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from - 1, to, " ");
      if (text === "/") {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    },
  });

  const addHeading = useCallback(
    (level: Level) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from })
        .toggleHeading({ level })
        .run();
      setShowMenu(false);
    },
    [editor]
  );

  return (
    <div className="relative border border-gray-300 rounded-lg mx-2 shadow-sm">
      <EditorContent editor={editor} className="w-full h-full p-8 pt-4 " />
      {showMenu && (
        <div className="absolute bg-white border border-gray-300 shadow-lg p-2 rounded-lg mt-2">
          <button onClick={() => addHeading(1)} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            見出し 1
          </button>
          <button onClick={() => addHeading(2)} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            見出し 2
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
