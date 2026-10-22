import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Editor } from "@tiptap/react";

type Props = { editor: Editor; open: boolean; onClose: () => void };

const normalizeUrl = (raw: string) => {
  const v = raw.trim();
  if (!v) return "";
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(v) ? v : `https://${v}`;
};

// نافذة "إدراج رابط" زي الـ Word: النص المعروض + العنوان
export default function LinkDialog({ editor, open, onClose }: Props) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const urlRef = useRef<HTMLInputElement>(null);

  // عند الفتح: لو المؤشر على رابط موجود نحدده بالكامل ونملّي البيانات
  useEffect(() => {
    if (!open) return;

    const editingLink = editor.isActive("link");
    if (editingLink) editor.chain().extendMarkRange("link").run();

    const { from, to } = editor.state.selection;
    setIsEditing(editingLink);
    setText(editor.state.doc.textBetween(from, to, " "));
    setUrl(editingLink ? (editor.getAttributes("link").href ?? "") : "");
    setError("");

    setTimeout(() => urlRef.current?.focus(), 0);
  }, [open, editor]);

  if (!open) return null;

  const apply = () => {
    const href = normalizeUrl(url);
    if (!href) {
      setError("اكتبي عنوان الرابط");
      return;
    }

    const { from, to, empty } = editor.state.selection;
    const selected = editor.state.doc.textBetween(from, to, " ");
    const label = text.trim();

    if (empty) {
      // مفيش نص متحدد: ندرج نص جديد عليه الرابط
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: label || href,
          marks: [{ type: "link", attrs: { href } }],
        })
        .run();
    } else if (label && label !== selected) {
      // النص المعروض اتغيّر
      editor
        .chain()
        .focus()
        .insertContentAt(
          { from, to },
          { type: "text", text: label, marks: [{ type: "link", attrs: { href } }] },
        )
        .run();
    } else {
      editor.chain().focus().setLink({ href }).run();
    }

    onClose();
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      apply();
    }
    if (e.key === "Escape") onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-md rounded-xl bg-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="rounded-t-xl bg-[#0d5c34] px-5 py-3 text-white">
          <h3 className="font-bold">{isEditing ? "تعديل الرابط" : "إدراج رابط"}</h3>
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold" htmlFor="link-text">
              النص المعروض
            </label>
            <input
              id="link-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#0d5c34]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold" htmlFor="link-url">
              العنوان
            </label>
            <input
              id="link-url"
              ref={urlRef}
              dir="ltr"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#0d5c34]"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-neutral-100 p-4">
          <div>
            {isEditing && (
              <button
                type="button"
                onClick={removeLink}
                className="cursor-pointer rounded-full border border-red-200 px-4 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                إزالة الرابط
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full border border-neutral-300 px-5 py-1.5 text-sm hover:bg-neutral-50"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={apply}
              className="cursor-pointer rounded-full bg-[#0d5c34] px-5 py-1.5 text-sm text-white hover:bg-[#094a29]"
            >
              {isEditing ? "تحديث" : "إدراج"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
