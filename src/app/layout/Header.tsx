import { MdOutlineMenu } from "react-icons/md";
import { LuPanelRightClose } from "react-icons/lu";
import { CiBellOn } from "react-icons/ci";
import { PageTitle } from "./PageTitle";
import { Button } from "../../shared/components/Button/Button";

type Props = { onOpenMobile: () => void; onToggleCollapse: () => void };

const iconBtn =
  "grid size-10 place-items-center rounded-lg text-text-primary transition-colors hover:bg-black/5";

export function Header({ onOpenMobile, onToggleCollapse }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center gap-3">
       <Button
  type="button"
  onClick={onOpenMobile}
  className={`${iconBtn} lg:hidden`}
>
  <MdOutlineMenu className="size-5" />
</Button>

        <Button
  type="button"
  onClick={onToggleCollapse}
  className={`${iconBtn} hidden lg:grid`}
>
  <LuPanelRightClose className="size-5 ltr:-scale-x-100" />
</Button>

        <PageTitle />

        {/* TODO: wire to real notifications + user menu */}
        <div className="ms-auto flex items-center gap-2">
          <button type="button" aria-label="الإشعارات" className={iconBtn}>
            <CiBellOn  className="size-5" />
          </button>
          <div className="grid size-10 place-items-center rounded-full bg-primary-gradient text-sm font-bold text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
