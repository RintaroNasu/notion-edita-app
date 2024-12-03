import { useCallback } from "react";
import { Editor } from "@tiptap/core";

type Props = {
  editor: Editor | null;
  setShowMenu: (showMenu: boolean) => void;
};

export const useEditorActions = (props: Props) => {
  const { editor, setShowMenu } = props;

  // 見出しを挿入する
  const addHeading = useCallback(
    (level: 1 | 2 | 3) => {
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

  // トグル操作 (リストや引用ブロックなど)
  const toggleEditorAction = useCallback(
    (actionType: "bulletList" | "orderedList" | "taskList" | "blockquote") => {
      if (!editor) return;
      const { from } = editor.state.selection;

      const actions = {
        bulletList: () => editor.chain().focus().toggleBulletList(),
        orderedList: () => editor.chain().focus().toggleOrderedList(),
        taskList: () => editor.chain().focus().toggleTaskList(),
        blockquote: () => editor.chain().focus().toggleBlockquote(),
      };

      editor
        .chain()
        .focus()
        .deleteRange({ from: from - 1, to: from })
        .insertContent(" ")
        .setNode("paragraph")
        .run();

      if (actions[actionType]) {
        actions[actionType]().run();
      }

      if (editor.isEmpty) {
        editor.commands.clearNodes();
      }

      setShowMenu(false);
    },
    [editor]
  );

  // 画像を挿入する
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!editor) return;
      const { from } = editor.state.selection;
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          editor
            .chain()
            .focus()
            .deleteRange({ from: from - 1, to: from })
            .setImage({ src: base64Image })
            .run();
        };
        event.target.value = "";
        setShowMenu(false);
        reader.readAsDataURL(file);
      }
    },
    [editor]
  );

  const openFileInput = useCallback(() => {
    const fileInput = document.getElementById("image-upload-input");
    fileInput?.click();
  }, []);

  // テーブルを挿入する
  const toggleTable = useCallback(() => {
    if (!editor) return;
    const { from } = editor.state.selection;
    editor
      .chain()
      .focus()
      .deleteRange({ from: from - 1, to: from })
      .insertContent(" ")
      .setNode("paragraph")
      .insertTable({ rows: 3, cols: 3 })
      .run();

    setShowMenu(false);
  }, [editor]);

  return {
    addHeading,
    toggleEditorAction,
    handleImageUpload,
    openFileInput,
    toggleTable,
  };
};
