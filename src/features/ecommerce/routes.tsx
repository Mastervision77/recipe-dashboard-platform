import { Route } from "react-router-dom";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";



export const ecommerceRoutes = (
    <>

    {/* about page */}
    <Route path="admin/shop" element={<h1>da</h1>} />
    <Route path="admin/shop/about-page" element={<About />} />
    <Route path="admin/shop/blog-page" element={<Blog />} />
        {/* <Route path="/shop/products" element={<ProductsPage />} />
        <Route path="/shop/products/:id" element={<ProductDetailsPage />} /> */}


        e-commerce
    </>
);