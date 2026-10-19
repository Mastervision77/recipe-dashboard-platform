import { Route } from "react-router-dom";
import About from "./pages/about/About";



export const ecommerceRoutes = (
    <>

    {/* about page */}
    <Route path="admin/shop" element={<h1>da</h1>} />
    <Route path="admin/shop/about-page" element={<About />} />
        {/* <Route path="/shop/products" element={<ProductsPage />} />
        <Route path="/shop/products/:id" element={<ProductDetailsPage />} /> */}


        e-commerce
    </>
);