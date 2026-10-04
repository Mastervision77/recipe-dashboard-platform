import { Route } from "react-router-dom";
import Informative from "./pages/InformativeWeb";
import ContactForm from "./pages/ContactForm";
import Survey from "./pages/Survey";

export const informativeRoutes = (
    <>
        <Route path="/admin/website" element={<Informative />} />
        <Route path="/admin/website/contact-form" element={<ContactForm />} />
        <Route path="/admin/website/survey" element={<Survey />} />
    </>
);