import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import {
  Color,
  FontFamily,
  FontSize,
  TextStyle,
} from "@tiptap/extension-text-style";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@tiptap/extension-table";
import { toast } from "sonner";
import { uploadEditorImage } from "./imageUpload";
import Toolbar from "./Toolbar";
import "./RichTextEditor.css";

type Props = {
  value: string;
  onChange: (html: string) => void;
  onBlur?: () => void;
  dir?: "rtl" | "ltr";
};

// يرفع الصور ويدرجها في مكان المؤشر (من الزرار أو الـ paste أو الـ drag & drop)
async function insertImages(editor: Editor | null, files: File[]) {
  if (!editor) return;

  for (const file of files) {
    try {
      const src = await uploadEditorImage(file);
      editor.chain().focus().setImage({ src, alt: file.name }).run();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "تعذر إضافة الصورة");
    }
  }
}

const imageFiles = (list?: FileList | null) =>
  Array.from(list ?? []).filter((f) => f.type.startsWith("image/"));

// Editor بيشتغل بـ HTML string (value/onChange) فيركب مع Formik بسهولة
export default function RichTextEditor({ value, onChange, onBlur, dir = "rtl" }: Props) {
  // refs عشان الـ callbacks تفضل محدّثة من غير ما نعيد إنشاء الـ editor
  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);
  onChangeRef.current = onChange;
  onBlurRef.current = onBlur;

  const editorRef = useRef<Editor | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: { dir },
      // لصق صورة من الـ clipboard
      handlePaste: (_view, event) => {
        const files = imageFiles(event.clipboardData?.files);
        if (!files.length) return false;
        insertImages(editorRef.current, files);
        return true;
      },
      // سحب وإفلات صورة
      handleDrop: (_view, event) => {
        const files = imageFiles(event.dataTransfer?.files);
        if (!files.length) return false;
        event.preventDefault();
        insertImages(editorRef.current, files);
        return true;
      },
    },
    onUpdate: ({ editor: e }) => {
      // editor فاضي => "" عشان الـ required validation يشتغل (مش "<p></p>")
      onChangeRef.current(e.isEmpty ? "" : e.getHTML());
    },
    onBlur: () => onBlurRef.current?.(),
  });

  editorRef.current = editor;

  // لما القيمة تتغيّر من بره (بعد الحفظ / reinitialize) نحدّث الـ editor من غير ما نطلّع onUpdate
  useEffect(() => {
    if (!editor) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if ((value || "") !== current) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rich-editor overflow-hidden rounded-lg border border-neutral-300 bg-white focus-within:border-[#0d5c34]">
      <Toolbar editor={editor} onPickImage={(files) => insertImages(editor, files)} />
      <EditorContent editor={editor} />
    </div>
  );
}
