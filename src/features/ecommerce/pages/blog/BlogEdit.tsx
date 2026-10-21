import { Link, useParams } from "react-router-dom";
import Loading from "../../../../shared/components/Loading/Loading";
import { useBlogQuery } from "../../DynamicContentPages/blogs/api/blogs.api";
import BlogEditTabs from "../../DynamicContentPages/blogs/components/blogForm/BlogEditTabs";
import { BLOGS_PATH } from "../../DynamicContentPages/blogs/utils/blogs.utils";

export default function BlogEdit() {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useBlogQuery(Number(id));

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">تعديل المقال</h1>
          <p className="text-gray-500">
            كل تبويب بيتحفظ لوحده بزرار الحفظ الخاص بيه
          </p>
        </div>
        <Link to={BLOGS_PATH} className="text-sm text-[#0d5c34] underline">
          الرجوع للمدونات
        </Link>
      </div>

      {isLoading && <Loading />}

      {isError && (
        <p className="text-red-600">تعذر تحميل المقال، حاولي مرة أخرى.</p>
      )}

      {blog && <BlogEditTabs record={blog} />}
    </div>
  );
}
