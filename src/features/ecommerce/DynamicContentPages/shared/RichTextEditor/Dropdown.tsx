import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  label: string;
  trigger: ReactNode;
  children: (close: () => void) => ReactNode;
};

// زرار بيفتح قائمة صغيرة وبيتقفل لما تدوسي بره
export default function Dropdown({ label, trigger, children }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        title={label}
        aria-label={label}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 min-w-8 cursor-pointer items-center justify-center rounded px-2 text-sm text-neutral-700 transition hover:bg-neutral-200"
      >
        {trigger}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}
