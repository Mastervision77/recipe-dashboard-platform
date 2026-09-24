import { Fragment } from "react";
import { useLocation } from "react-router-dom";


import { getActiveModule, getTrail } from "./lib/nav";
import { LuChevronRight } from "react-icons/lu";

/** Title + breadcrumbs derived from config/modules.ts */
export function PageTitle() {
  const { pathname } = useLocation();

  const mod = getActiveModule(pathname);
  const trail = getTrail(mod, pathname);

  const title = trail.at(-1)?.title ?? mod.title;
  const crumbs = [
    mod.title,
    ...trail.slice(0, -1).map((item) => item.title),
  ];

  return (
    <div className="min-w-0">
      <h1 className="truncate text-lg font-bold text-text-primary">
        {title}
      </h1>

      <ol className="hidden items-center gap-1 text-xs text-text-primary/60 sm:flex">
        {crumbs.map((crumb) => (
          <Fragment key={crumb}>
            <li>{crumb}</li>

            <LuChevronRight className="size-3 rtl:rotate-180" />
          </Fragment>
        ))}

        <li className="text-text-primary">{title}</li>
      </ol>
    </div>
  );
}