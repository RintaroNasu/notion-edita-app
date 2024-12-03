"use client";

import { useEffect, useState } from "react";

import { EditorMenu } from "./EditMenu";
import { useEditorActions } from "@/hooks/useEditorActions";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BlockQuote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

const DEFAULT_EDITOR_LINES = 15;

export const Editor = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock,
      BulletList,
      OrderedList,
      TaskList,
      BlockQuote,
      Image,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: "Type / to browse options",
      }),
    ],
    content: Array(DEFAULT_EDITOR_LINES).fill("<p></p>").join(""),
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const currentLine = editor.state.doc.textBetween(editor.state.selection.$anchor.start(), editor.state.selection.$anchor.end(), "\n");

      if (currentLine.trim() === "/") {
        const { left, bottom } = editor.view.coordsAtPos(editor.state.selection.$anchor.pos);
        setMenuPosition({ top: bottom + window.scrollY, left });
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }

      setTimeout(() => {
        if (editor.isEmpty) {
          editor.commands.clearNodes();
        }
      }, 0);
    },
  });

  const { addHeading, toggleEditorAction, handleImageUpload, openFileInput, toggleTable } = useEditorActions({ editor, setShowMenu });

  useEffect(() => {
    if (editor && editor.isEmpty) {
      editor.commands.blur();
    }
  }, [editor]);

  return (
    <div className="mt-4 relative border border-gray-300 rounded-lg mx-2 min-h-[400px]">
      <EditorContent editor={editor} className="w-full h-full pl-4 pt-2" />
      <input id="image-upload-input" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      {showMenu && <EditorMenu addHeading={addHeading} toggleEditorAction={toggleEditorAction} openFileInput={openFileInput} toggleTable={toggleTable} position={menuPosition} />}
    </div>
  );
};
