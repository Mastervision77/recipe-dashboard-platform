import Dropdown from "./Dropdown";

const COLORS = [
  "#000000", "#7f7f7f", "#c00000", "#ff0000", "#ffc000", "#ffff00",
  "#92d050", "#00b050", "#00b0f0", "#0070c0", "#002060", "#7030a0",
];

type Props = {
  label: string;
  icon: React.ReactNode;
  current?: string | null;
  noneLabel: string;
  onPick: (color: string | null) => void;
};

// قائمة ألوان زي الـ Word (لون الخط / لون التظليل)
export default function ColorMenu({ label, icon, current, noneLabel, onPick }: Props) {
  return (
    <Dropdown
      label={label}
      trigger={
        <span className="flex flex-col items-center leading-none">
          {icon}
          <span
            className="mt-0.5 h-1 w-4 rounded-sm"
            style={{ background: current || "#d4d4d4" }}
          />
        </span>
      }
    >
      {(close) => (
        <div className="w-40 space-y-2" dir="rtl">
          <div className="grid grid-cols-6 gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(c);
                  close();
                }}
                className="h-5 w-5 cursor-pointer rounded border border-neutral-300"
                style={{ background: c }}
              />
            ))}
          </div>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onPick(null);
              close();
            }}
            className="w-full cursor-pointer rounded border border-neutral-200 py-1 text-xs hover:bg-neutral-100"
          >
            {noneLabel}
          </button>
        </div>
      )}
    </Dropdown>
  );
}
