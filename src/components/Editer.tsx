"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading, { Level } from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BlockQuote from "@tiptap/extension-blockquote";

export const Editor = () => {
  const [showMenu, setShowMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock,
      BulletList,
      OrderedList,
      TaskList,
      BlockQuote,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: "Type / to browse options",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const allText = editor.getText().split("\n");
      const lastLine = allText[allText.length - 1];

      if (lastLine === "/") {
        setShowMenu(true);
        return;
      }
      setShowMenu(false);

      setTimeout(() => {
        if (editor.isEmpty) {
          editor.commands.clearNodes();
        }
      }, 0);
    },
  });

  const addHeading = useCallback(
    (level: Level) => {
      if (!editor) return;
      const { from } = editor.state.selection;

      editor
        .chain()
        .focus()
        .deleteRange({ from: from - 1, to: from })
        .insertContent(" ")
        .setNode("paragraph")
        .toggleHeading({ level })
        .run();

      setShowMenu(false);
    },

    [editor]
  );

  const toggleBulletList = useCallback(() => {
    if (!editor) return;
    const { from } = editor.state.selection;

    editor
      .chain()
      .focus()
      .deleteRange({ from: from - 1, to: from })
      .insertContent(" ")
      .setNode("paragraph")
      .toggleBulletList()
      .run();

    if (editor.isEmpty) {
      editor.commands.clearNodes();
    }

    setShowMenu(false);
  }, [editor]);

  const toggleOrderList = useCallback(() => {
    if (!editor) return;
    const { from } = editor.state.selection;

    editor
      .chain()
      .focus()
      .deleteRange({ from: from - 1, to: from })
      .insertContent(" ")
      .setNode("paragraph")
      .toggleOrderedList()
      .run();

    if (editor.isEmpty) {
      editor.commands.clearNodes();
    }

    setShowMenu(false);
  }, [editor]);

  const toggleTaskList = useCallback(() => {
    if (!editor) return;
    const { from } = editor.state.selection;

    editor
      .chain()
      .focus()
      .deleteRange({ from: from - 1, to: from })
      .insertContent(" ")
      .setNode("paragraph")
      .toggleTaskList()
      .run();

    if (editor.isEmpty) {
      editor.commands.clearNodes();
    }

    setShowMenu(false);
  }, [editor]);

  const toggleBlockQuote = useCallback(() => {
    if (!editor) return;
    const { from } = editor.state.selection;

    editor
      .chain()
      .focus()
      .deleteRange({ from: from - 1, to: from })
      .insertContent(" ")
      .setNode("paragraph")
      .toggleBlockquote()
      .run();

    if (editor.isEmpty) {
      editor.commands.clearNodes();
    }
  
    setShowMenu(false);
  }, [editor]);

  useEffect(() => {
    if (editor && editor.isEmpty) {
      editor.commands.blur();
    }
  }, [editor]);

  return (
    <div className="mt-4 relative border-gray-300 rounded-lg mx-2 border-none">
      <EditorContent editor={editor} className="w-full h-full pl-4" />
      {showMenu && (
        <div className="absolute bg-white border border-gray-300 shadow-lg p-2 rounded-lg mt-2">
          <button onClick={() => addHeading(1)} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            見出し 1
          </button>
          <button onClick={() => addHeading(2)} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            見出し 2
          </button>
          <button onClick={toggleBulletList} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            丸付きリスト
          </button>
          <button onClick={toggleOrderList} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            番号付きリスト
          </button>
          <button onClick={toggleTaskList} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            チェックリスト
          </button>
          <button onClick={toggleBlockQuote} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
            引用ブロック
          </button>
        </div>
      )}
    </div>
  );
};
