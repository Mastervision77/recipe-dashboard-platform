import { Route } from "react-router-dom";
import RolesPage from "./pages/roles";
import RoleCreatePage from "./pages/roles/create";

export const adminRoutes = (
  <>
    <Route path="/admin/settings/roles" element={<RolesPage />} />
    <Route path="/admin/settings/roles/create" element={<RoleCreatePage />} />
    <Route path="/admin/settings/roles/:id" element={<RoleCreatePage />} />
  </>
);
