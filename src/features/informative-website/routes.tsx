import { Route } from "react-router-dom";
import Informative from "./pages/InformativeWeb";
import ContactForm from "./pages/ContactForm";

export const informativeRoutes = (
    <>
        <Route path="/admin/website" element={<Informative />} />
        <Route path="/admin/website/contact-form" element={<ContactForm />} />
    </>
);