export type TabItem = { id: string; label: string; hasError?: boolean };

type Props = {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
};

export default function TabsBar({ tabs, active, onChange }: Props) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-neutral-200" dir="rtl">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`relative cursor-pointer whitespace-nowrap border-b-2 px-5 py-3 text-sm font-semibold transition ${
              isActive
                ? "border-[#0d5c34] text-[#0d5c34]"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t.label}
            {t.hasError && (
              <span className="absolute right-1 top-2 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
