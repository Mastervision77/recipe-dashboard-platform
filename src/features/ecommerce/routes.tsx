import { Route } from "react-router-dom";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import BlogCreate from "./pages/blog/BlogCreate";
import BlogEdit from "./pages/blog/BlogEdit";
import Categories from "./pages/categories/Categories";



export const ecommerceRoutes = (
    <>

    {/* about page */}
    <Route path="admin/shop" element={<h1>da</h1>} />
    <Route path="admin/shop/about-page" element={<About />} />
    <Route path="admin/shop/blog-page" element={<Blog />} />

     <Route path="admin/shop/blog-page/new" element={<BlogCreate />} />
    <Route path="admin/shop/blog-page/:id" element={<BlogEdit />} />

    {/* blog categories */}
    <Route path="admin/shop/blog-categories" element={<Categories />} />
        {/* <Route path="/shop/products" element={<ProductsPage />} />
        <Route path="/shop/products/:id" element={<ProductDetailsPage />} /> */}


        e-commerce
    </>
);