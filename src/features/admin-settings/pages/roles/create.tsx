import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import RoleForm from "../../components/roles/RoleForm";

export default function RoleCreatePage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/admin/settings/roles"
          aria-label="رجوع"
          className="grid size-10 place-items-center rounded-lg text-text-primary transition-colors hover:bg-black/5"
        >
          <LuArrowRight className="size-5 ltr:-scale-x-100" />
        </Link>

        <h1 className="text-2xl font-bold">إضافة دور جديد</h1>
      </div>

      <RoleForm />
    </div>
  );
}
