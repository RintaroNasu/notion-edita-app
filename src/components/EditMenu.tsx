type Props = {
  addHeading: (level: 1 | 2) => void;
  toggleEditorAction: (actionType: "bulletList" | "orderedList" | "taskList" | "blockquote") => void;
  openFileInput: () => void;
  toggleTable: () => void;
};

export const EditorMenu = (props: Props) => {
  const { addHeading, toggleEditorAction, openFileInput, toggleTable } = props;

  return (
    <div className="absolute bg-white border border-gray-300 shadow-lg p-2 rounded-lg mt-2">
      <button onClick={() => addHeading(1)} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        見出し 1
      </button>
      <button onClick={() => addHeading(2)} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        見出し 2
      </button>
      <button onClick={() => toggleEditorAction("bulletList")} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        丸付きリスト
      </button>
      <button onClick={() => toggleEditorAction("orderedList")} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        番号付きリスト
      </button>
      <button onClick={() => toggleEditorAction("taskList")} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        チェックリスト
      </button>
      <button onClick={() => toggleEditorAction("blockquote")} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        引用ブロック
      </button>
      <button onClick={openFileInput} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        画像
      </button>
      <button onClick={toggleTable} className="block px-4 py-2 text-left hover:bg-gray-100 w-full">
        テーブル
      </button>
    </div>
  );
};
