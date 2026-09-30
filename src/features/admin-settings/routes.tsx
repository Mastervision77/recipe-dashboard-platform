import { Route } from "react-router-dom";
import RolesPage from "./pages/roles";

export const adminRoutes = (
  <>
    <Route path="/admin/settings/roles" element={<RolesPage />} />
  </>
);
