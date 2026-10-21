import { Link } from "react-router-dom";
import BlogCreateForm from "../../DynamicContentPages/blogs/components/blogForm/BlogCreateForm";
import { BLOGS_PATH } from "../../DynamicContentPages/blogs/utils/blogs.utils";

export default function BlogCreate() {
  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إضافة مقال</h1>
        <Link to={BLOGS_PATH} className="text-sm text-[#0d5c34] underline">
          الرجوع للمدونات
        </Link>
      </div>

      <BlogCreateForm />
    </div>
  );
}
