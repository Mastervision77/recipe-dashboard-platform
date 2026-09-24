import clsx from "clsx";
import type { AdminModule } from "./config/modules";
import { NavItemView } from "./NavItemView";

type Props = { mod: AdminModule; collapsed: boolean; onNavigate?: () => void };

/** The menu of the currently active module (replaces Metronic's aside-secondary + Tabs/*). */
export function ModulePanel({ mod, collapsed, onNavigate }: Props) {
  return (
    <div className={clsx("flex w-64 flex-col", collapsed && "lg:hidden")}>
      <div className="flex h-16 items-center px-5">
        <h2 className="text-base font-bold text-text-primary">{mod.title}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {mod.sections.map((section, i) => (
          <div key={i} className="mb-4">
            {section.title && (
              <p className="mb-2 px-3 text-xs font-semibold text-text-primary/50">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <NavItemView key={item.href} item={item} onNavigate={onNavigate} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
