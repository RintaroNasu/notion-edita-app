import { Editor } from "@/components/Editer";

export default function Home() {
  return (
    <>
      <div className="w-full h-[100vh]">
        <div className="text-[1.875rem] font-semibold text-[#00a496] flex justify-center">notionエディタ</div>
        <Editor />
      </div>
    </>
  );
}
