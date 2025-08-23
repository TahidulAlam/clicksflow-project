"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

// Dynamically import all Verbum components with SSR disabled
const EditorComposer = dynamic(
  () => import("verbum").then((mod) => mod.EditorComposer),
  { ssr: false }
);

const Editor = dynamic(() => import("verbum").then((mod) => mod.Editor), {
  ssr: false,
});

const ToolbarPlugin = dynamic(
  () => import("verbum").then((mod) => mod.ToolbarPlugin),
  { ssr: false }
);

const InsertDropdown = dynamic(
  () => import("verbum").then((mod) => mod.InsertDropdown),
  { ssr: false }
);

const AlignDropdown = dynamic(
  () => import("verbum").then((mod) => mod.AlignDropdown),
  { ssr: false }
);

const RichTextEditor: FC = () => {
  return (
    <EditorComposer>
      <Editor hashtagsEnabled={true}>
        <ToolbarPlugin defaultFontSize="20px">
          <InsertDropdown enablePoll={false} />
          <AlignDropdown />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
};

export default RichTextEditor;
