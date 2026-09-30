import { Navigate } from "react-router-dom";
import logo from "../../../assets/logo.png"
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="//admin/settings/dashboard" replace />;
    }

    return (
        <div dir="rtl" className="flex min-h-screen">
            {/* Brand panel - hidden on small screens, orange gradient from the design system */}
            <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-primary-gradient px-12 py-14 text-white lg:flex">

                {/* Logo in a white chip so it stays legible on the gradient */}
                <div className="relative z-10 inline-flex w-fit items-center rounded-xl bg-white px-4 py-2 shadow-sm">
                    <img
                        src={logo}
                        alt="Recipe"
                        width={120}
                        height={40}
                        className="h-16 w-auto"
                    />
                </div>

                <div className="relative z-10 max-w-sm">
                    <h1 className="text-2xl font-semibold text-white">
                        لوحة تحكم الإدارة
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                        إدارة المنتجات والطلبات والعملاء وإعدادات المنصة كلها
                        من مكان واحد.
                    </p>
                </div>

                <p className="relative z-10 text-xs text-white/70">
                    © {new Date().getFullYear()} Recipe. جميع الحقوق محفوظة.
                </p>
            </div>

            {/* Form panel */}
            <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-14">
                <div className="w-full max-w-sm">
                    <div className="mb-8 lg:hidden">
                        <img
                            src={logo}
                            alt="Recipe"
                            width={120}
                            height={40}
                            className="h-13 w-auto"
                        />
                    </div>

                    <h2 className="text-xl font-semibold text-slate-900">
                        تسجيل الدخول
                    </h2>
                    <p className="mt-1.5 mb-8 text-sm text-slate-500">
                        استخدم حساب الإدارة الخاص بك للمتابعة.
                    </p>

                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
