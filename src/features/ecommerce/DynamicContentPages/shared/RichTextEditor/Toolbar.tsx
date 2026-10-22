import { useRef, useState } from "react";
import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import {
  FiAlignCenter,
  FiAlignJustify,
  FiAlignLeft,
  FiAlignRight,
  FiBold,
  FiGrid,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiRotateCcw,
  FiRotateCw,
  FiUnderline,
} from "react-icons/fi";
import ColorMenu from "./ColorMenu";
import LinkDialog from "./LinkDialog";

const FONTS = ["Arial", "Tahoma", "Times New Roman", "Georgia", "Verdana", "Courier New"];
const SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

const STYLES = [
  { id: "p", label: "عادي" },
  { id: "h1", label: "عنوان 1" },
  { id: "h2", label: "عنوان 2" },
  { id: "h3", label: "عنوان 3" },
  { id: "quote", label: "اقتباس" },
];

type BtnProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function Btn({ label, active, disabled, onClick, children }: BtnProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      // preventDefault عشان الـ editor ما يفقدش الـ selection
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded px-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-[#0d5c34] text-white" : "text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px bg-neutral-300" />;

const selectClass =
  "h-8 cursor-pointer rounded border border-neutral-300 bg-white px-2 text-sm outline-none focus:border-[#0d5c34]";

type Props = { editor: Editor; onPickImage: (files: File[]) => void };

export default function Toolbar({ editor, onPickImage }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);

  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      const ts = e.getAttributes("textStyle");
      return {
        style: e.isActive("heading", { level: 1 })
          ? "h1"
          : e.isActive("heading", { level: 2 })
            ? "h2"
            : e.isActive("heading", { level: 3 })
              ? "h3"
              : e.isActive("blockquote")
                ? "quote"
                : "p",
        font: ((ts.fontFamily as string) || "").replace(/["']/g, ""),
        size: (ts.fontSize as string) || "",
        color: (ts.color as string) || null,
        highlight: (e.getAttributes("highlight").color as string) || null,
        bold: e.isActive("bold"),
        italic: e.isActive("italic"),
        underline: e.isActive("underline"),
        strike: e.isActive("strike"),
        bullet: e.isActive("bulletList"),
        ordered: e.isActive("orderedList"),
        link: e.isActive("link"),
        left: e.isActive({ textAlign: "left" }),
        center: e.isActive({ textAlign: "center" }),
        right: e.isActive({ textAlign: "right" }),
        justify: e.isActive({ textAlign: "justify" }),
        inTable: e.isActive("table"),
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
      };
    },
  });

  const chain = () => editor.chain().focus();

  const applyStyle = (id: string) => {
    const c = chain();
    // نخرج من الاقتباس الأول لو بنختار ستايل تاني
    if (s.style === "quote" && id !== "quote") c.toggleBlockquote();

    if (id === "p") c.setParagraph();
    else if (id === "quote") {
      if (s.style !== "quote") c.toggleBlockquote();
    } else c.setHeading({ level: Number(id.slice(1)) as 1 | 2 | 3 });

    c.run();
  };

  return (
    <div className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50 p-2" dir="rtl">
      {/* الصف الأول: تنسيق الخط */}
      <div className="flex flex-wrap items-center gap-1">
        <Btn label="تراجع" disabled={!s.canUndo} onClick={() => chain().undo().run()}>
          <FiRotateCcw size={16} />
        </Btn>
        <Btn label="إعادة" disabled={!s.canRedo} onClick={() => chain().redo().run()}>
          <FiRotateCw size={16} />
        </Btn>

        <Sep />

        <select
          aria-label="النمط"
          value={s.style}
          onChange={(e) => applyStyle(e.target.value)}
          className={`${selectClass} w-28`}
        >
          {STYLES.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          aria-label="نوع الخط"
          value={FONTS.includes(s.font) ? s.font : ""}
          onChange={(e) =>
            e.target.value
              ? chain().setFontFamily(e.target.value).run()
              : chain().unsetFontFamily().run()
          }
          className={`${selectClass} w-36`}
        >
          <option value="">الخط</option>
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>
              {f}
            </option>
          ))}
        </select>

        <select
          aria-label="حجم الخط"
          value={SIZES.some((n) => `${n}px` === s.size) ? s.size : ""}
          onChange={(e) =>
            e.target.value
              ? chain().setFontSize(e.target.value).run()
              : chain().unsetFontSize().run()
          }
          className={`${selectClass} w-20`}
        >
          <option value="">الحجم</option>
          {SIZES.map((n) => (
            <option key={n} value={`${n}px`}>
              {n}
            </option>
          ))}
        </select>

        <Sep />

        <Btn label="غامق" active={s.bold} onClick={() => chain().toggleBold().run()}>
          <FiBold size={16} />
        </Btn>
        <Btn label="مائل" active={s.italic} onClick={() => chain().toggleItalic().run()}>
          <FiItalic size={16} />
        </Btn>
        <Btn label="تسطير" active={s.underline} onClick={() => chain().toggleUnderline().run()}>
          <FiUnderline size={16} />
        </Btn>
        <Btn label="يتوسطه خط" active={s.strike} onClick={() => chain().toggleStrike().run()}>
          <span className="line-through">S</span>
        </Btn>

        <ColorMenu
          label="لون الخط"
          icon={<span className="text-sm font-bold">A</span>}
          current={s.color}
          noneLabel="تلقائي"
          onPick={(c) => (c ? chain().setColor(c).run() : chain().unsetColor().run())}
        />
        <ColorMenu
          label="لون التظليل"
          icon={<span className="rounded-sm bg-yellow-200 px-0.5 text-xs font-bold">ab</span>}
          current={s.highlight}
          noneLabel="بدون تظليل"
          onPick={(c) =>
            c ? chain().setHighlight({ color: c }).run() : chain().unsetHighlight().run()
          }
        />

        <Btn
          label="مسح التنسيق"
          onClick={() => chain().unsetAllMarks().setParagraph().run()}
        >
          <span className="text-xs">مسح</span>
        </Btn>
      </div>

      {/* الصف التاني: فقرة وإدراج */}
      <div className="mt-1 flex flex-wrap items-center gap-1">
        <Btn label="محاذاة لليمين" active={s.right} onClick={() => chain().setTextAlign("right").run()}>
          <FiAlignRight size={16} />
        </Btn>
        <Btn label="توسيط" active={s.center} onClick={() => chain().setTextAlign("center").run()}>
          <FiAlignCenter size={16} />
        </Btn>
        <Btn label="محاذاة لليسار" active={s.left} onClick={() => chain().setTextAlign("left").run()}>
          <FiAlignLeft size={16} />
        </Btn>
        <Btn label="ضبط" active={s.justify} onClick={() => chain().setTextAlign("justify").run()}>
          <FiAlignJustify size={16} />
        </Btn>

        <Sep />

        <Btn label="قائمة نقطية" active={s.bullet} onClick={() => chain().toggleBulletList().run()}>
          <FiList size={16} />
        </Btn>
        <Btn label="قائمة رقمية" active={s.ordered} onClick={() => chain().toggleOrderedList().run()}>
          1.
        </Btn>

        <Sep />

        <Btn label="رابط" active={s.link} onClick={() => setLinkOpen(true)}>
          <FiLink size={16} />
        </Btn>
        <Btn label="إدراج صورة" onClick={() => fileInput.current?.click()}>
          <FiImage size={16} />
        </Btn>
        <Btn
          label="إدراج جدول"
          onClick={() =>
            chain().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
          }
        >
          <FiGrid size={16} />
        </Btn>
        <Btn label="خط فاصل" onClick={() => chain().setHorizontalRule().run()}>
          —
        </Btn>

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            onPickImage(Array.from(e.target.files ?? []));
            e.target.value = ""; // يسمح باختيار نفس الصورة تاني
          }}
        />
      </div>

      {/* أدوات الجدول: بتظهر بس لما المؤشر جوه جدول */}
      {s.inTable && (
        <div className="mt-1 flex flex-wrap items-center gap-1 rounded bg-green-50 p-1 text-xs">
          <span className="px-2 font-semibold text-[#0d5c34]">الجدول:</span>
          <Btn label="إضافة صف" onClick={() => chain().addRowAfter().run()}>+ صف</Btn>
          <Btn label="إضافة عمود" onClick={() => chain().addColumnAfter().run()}>+ عمود</Btn>
          <Btn label="حذف الصف" onClick={() => chain().deleteRow().run()}>- صف</Btn>
          <Btn label="حذف العمود" onClick={() => chain().deleteColumn().run()}>- عمود</Btn>
          <Btn label="حذف الجدول" onClick={() => chain().deleteTable().run()}>
            <span className="text-red-600">حذف الجدول</span>
          </Btn>
        </div>
      )}

      <LinkDialog editor={editor} open={linkOpen} onClose={() => setLinkOpen(false)} />
    </div>
  );
}
