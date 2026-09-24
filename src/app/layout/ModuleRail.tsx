import clsx from "clsx";
import { adminModules } from "./config/modules";
import { getDefaultHref } from "./lib/nav";
import { Link } from "react-router-dom";

type Props = { activeKey: string; onNavigate?: () => void };

/** Narrow icon column: one button per module (replaces Metronic's AsideTabs). */
export function ModuleRail({ activeKey, onNavigate }: Props) {
  return (
    <nav
      aria-label="الوحدات"
      className="flex w-[72px] shrink-0 flex-col items-center border-e border-black/5 bg-white py-4"
    >
      {/* TODO: replace with the real logo */}
      <Link
        to="/admin"
        onClick={onNavigate}
        className="mb-6 grid size-11 place-items-center rounded-xl bg-secondary-gradient text-lg font-bold text-white"
      >
        R
      </Link>

      <ul className="flex flex-col gap-2">
        {adminModules.map((m) => {
          const Icon = m.icon;
          const active = m.key === activeKey;
          return (
            <li key={m.key}>
              <Link
                to={getDefaultHref(m)}
                onClick={onNavigate}
                title={m.title}
                aria-label={m.title}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "grid size-11 place-items-center rounded-xl transition-colors",
                  active
                    ? "bg-primary-500/10 text-secondary-500"
                    : "text-text-primary/50 hover:bg-black/5 hover:text-text-primary",
                )}
              >
                <Icon className="size-6" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
