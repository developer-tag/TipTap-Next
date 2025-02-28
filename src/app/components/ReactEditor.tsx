"use client";
import { useMemo, useState } from "react";
import { Sun, Moon, Lock, Unlock } from "lucide-react";
import RichTextEditor from "reactjs-tiptap-editor";
import {
  Attachment,
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  Excalidraw,
  ExportPdf,
  ExportWord,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  Image,
  ImportWord,
  Indent,
  Italic,
  LineHeight,
  Link,
  Mention,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TableOfContents,
  TaskList,
  TextAlign,
  TextDirection,
  Underline,
  Video,
} from "reactjs-tiptap-editor/extension-bundle";
import "./richtext-editor.css";
// import "katex/dist/katex.min.css";

function convertBase64ToBlob(base64: string): Blob {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new Blob([u8arr], { type: mime });
}

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50000,
    },
  }),
  History,
  SearchAndReplace,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (file: File) =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(file));
        }, 500);
      }),
  }),
  Video.configure({
    upload: (file: File) =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(file));
        }, 500);
      }),
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: "dracula" }),
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
    upload: (files: File[]) => {
      const fileObjs = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      return Promise.resolve(fileObjs);
    },
  }),
  ExportWord,
  Excalidraw,
  TextDirection,
  Mention,
  Attachment.configure({
    upload: (file: File) =>
      new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          const blob = convertBase64ToBlob(result);
          resolve(URL.createObjectURL(blob));
        };
      }),
  }),
];

const DEFAULT = `<p dir="auto"></p>`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

function ReactEditor() {
  const [content, setContent] = useState<string>(DEFAULT);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [disable, setDisable] = useState<boolean>(false);

  // Memoize the debounced function so it remains stable between renders.
  const onValueChange = useMemo(
    () =>
      debounce((value: string) => {
        setContent(value);
      }, 300),
    [setContent]
  );

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "#1f2937";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = "black";
  };

  return (
    <div className="container mx-auto p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            marginTop: "1rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Text Editor
        </h1>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <button
            type="button"
            style={{
              padding: "0.5rem",
              backgroundColor: "black",
              color: "white",
              borderRadius: "0.75rem",
              transition: "background-color 0.2s",
              cursor: 'pointer'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            style={{
              padding: "0.5rem",
              backgroundColor: "black",
              color: "white",
              borderRadius: "0.75rem",
              transition: "background-color 0.2s",
              cursor: 'pointer'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => setDisable(!disable)}
            aria-label={disable ? "Make editable" : "Make readonly"}
          >
            {disable ? <Lock size={20} /> : <Unlock size={20} />}
          </button>
        </div>
      </div>
      <RichTextEditor
        output="html"
        content={content}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={theme === "dark"}
        disabled={disable}
      />
    </div>
  );
}

export default ReactEditor;
// <div className="flex justify-between items-center">
//   <h1 className="text-4xl font-bold my-4 text-center">Text Editor</h1>
//   <div className="flex gap-4">
//     <button
//       type="button"
//       className="p-2 bg-black text-white rounded-xl transition-colors hover:bg-gray-800"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
//     >
//       {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//     </button>

//     <button
//       type="button"
//       className="p-2 bg-black text-white rounded-xl transition-colors hover:bg-gray-800"
//       onClick={() => setDisable(!disable)}
//       aria-label={disable ? "Make editable" : "Make readonly"}
//     >
//       {disable ? <Lock size={20} /> : <Unlock size={20} />}
//     </button>
//   </div>
// </div>
