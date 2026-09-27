import { AppProviders } from "./providers/AppProviders";
import { AppRouter } from "./router/AppRouter";
import { Toaster } from "sonner";

export default function App() {
    return (
        <AppProviders>
            <AppRouter />
             <Toaster
                position="top-right"
                richColors
                closeButton
            />
        </AppProviders>
    );
}