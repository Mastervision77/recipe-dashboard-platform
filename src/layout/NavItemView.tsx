import clsx from "clsx";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import type { NavItem } from "./config/modules";
import { isPathActive } from "./lib/nav";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "../shared/components/Button/Button";

type Props = {
  item: NavItem;
  onNavigate?: () => void;
};

export function NavItemView({ item, onNavigate }: Props) {
  const { pathname } = useLocation();

  const active = isPathActive(pathname, item.href, item.exact);

  const [open, setOpen] = useState(active);

  const Icon = item.icon;

  const base =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors";

  const state = active
    ? "bg-primary-500/10 font-semibold text-primary-500"
    : "text-text-primary hover:bg-black/5";

  if (item.children?.length) {
    return (
      <li>
       <Button
  type="button"
  onClick={() => setOpen((o) => !o)}
  className={clsx(base, state)}
>
  {Icon && <Icon className="size-5 shrink-0" />}

  <span className="flex-1 text-start">
    {item.title}
  </span>

  <LuChevronDown
    className={clsx(
      "size-4 transition-transform",
      open && "rotate-180",
    )}
  />
</Button>

        {open && (
          <ul className="ms-5 mt-1 space-y-1 border-s border-black/10 ps-3">
            {item.children.map((child) => (
              <NavItemView
                key={child.href}
                item={child}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={clsx(base, state)}
      >
        {Icon && <Icon className="size-5 shrink-0" />}

        <span>{item.title}</span>
      </Link>
    </li>
  );
}