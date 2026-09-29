import { Route } from "react-router-dom";
import Informative from "./pages/InformativeWeb";

export const informativeRoutes = (
    <>
        <Route path="/admin/website" element={<Informative />} />
        {/* <Route path="/shop/products/:id" element={<ProductDetailsPage />} /> */}
    </>
);