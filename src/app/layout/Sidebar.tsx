import { useLocation } from "react-router-dom";
import clsx from "clsx";

import { getActiveModule } from "./lib/nav";
import { ModulePanel } from "./ModulePanel";
import { ModuleRail } from "./ModuleRail";

type Props = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
};

export function Sidebar({ open, collapsed, onClose }: Props) {
  const { pathname } = useLocation();

  const activeModule = getActiveModule(pathname);

  return (
    <>
      {/* Mobile overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-overlay-brown transition-opacity lg:hidden",
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={clsx(
          "fixed inset-y-0 start-0 z-50 flex bg-white shadow-primary transition-transform duration-200",
          "lg:sticky lg:top-0 lg:h-dvh lg:border-e lg:border-black/5 lg:shadow-none",
          !open &&
            "max-lg:ltr:-translate-x-full max-lg:rtl:translate-x-full",
        )}
      >
        <ModuleRail
          activeKey={activeModule.key}
          onNavigate={onClose}
        />

        <ModulePanel
          mod={activeModule}
          collapsed={collapsed}
          onNavigate={onClose}
        />
      </aside>
    </>
  );
}