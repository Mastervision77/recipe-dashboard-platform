import { adminModules, type AdminModule, type NavItem } from "../config/modules";

export function isPathActive(pathname: string, href: string, exact = false) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

/** The module that owns the current URL. Anything else under /admin falls back to `main`. */
export function getActiveModule(pathname: string): AdminModule {
  return (
    adminModules.find((m) => m.key !== "main" && isPathActive(pathname, m.basePath)) ??
    adminModules.find((m) => m.key === "main")!
  );
}

export function getDefaultHref(mod: AdminModule) {
  return mod.sections[0].items[0].href;
}

/** Path of nav items leading to the current page (longest matching href wins). */
export function getTrail(mod: AdminModule, pathname: string): NavItem[] {
  let best: NavItem[] = [];
  let bestLen = -1;

  const walk = (items: NavItem[], parents: NavItem[]) => {
    for (const item of items) {
      const trail = [...parents, item];
      if (isPathActive(pathname, item.href, item.exact) && item.href.length > bestLen) {
        best = trail;
        bestLen = item.href.length;
      }
      if (item.children) walk(item.children, trail);
    }
  };

  mod.sections.forEach((s) => walk(s.items, []));
  return best;
}
