/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Image from "@tiptap/extension-image";
// MenuBar component for rich text editor
const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const getButtonClass = (isActive: boolean) =>
    `p-1 rounded-md border ${
      isActive
        ? "bg-default-slate-200 "
        : "bg-default-gray-100 text-default-gray-700"
    } hover:bg-default-slate-500 hover:text-default-white transition-colors duration-200`;

  return (
    <div className="flex space-x-2 justify-start mb-4">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={getButtonClass(editor.isActive("bold"))}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={getButtonClass(editor.isActive("italic"))}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={getButtonClass(editor.isActive("strike"))}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={getButtonClass(editor.isActive("heading", { level: 1 }))}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={getButtonClass(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={getButtonClass(editor.isActive("bulletList"))}
      >
        Bullet List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={getButtonClass(editor.isActive("orderedList"))}
      >
        Ordered List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={getButtonClass(false)}
      >
        Line
      </button>
      <button
        className={getButtonClass(false)}
        type="button"
        onClick={addImage}
      >
        image
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={getButtonClass(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.99 16.5-3.75 3.75m0 0L4.49 16.5m3.75 3.75V3.75h11.25"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={getButtonClass(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.99 16.5 3.75 3.75m0 0 3.75-3.75m-3.75 3.75V3.75H4.49"
          />
        </svg>
      </button>
    </div>
  );
};

// Tiptap component with rich text editor
const Tiptap = ({ onDescrptionChange, FormValue }: any) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: FormValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm h-[200px] p-4 border border-gray-300 rounded-md focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      // Whenever the content changes, call the parent function with updated HTML
      const htmlContent = editor.getHTML(); 
      onDescrptionChange(htmlContent); // Pass content back to the parent form
    },
  });

 

  return (
    <div className=" mx-auto mt-8">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
