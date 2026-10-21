import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../shared/components/Button/Button";
import { ModalTemplate } from "../../../../../../shared/components/modal/ModalTemplate";
import { Table } from "../../../../../../shared/components/Table/Table";
import Paginate from "../../../../../../shared/components/pagination/Paginate";
import Loading from "../../../../../../shared/components/Loading/Loading";
import { getPageView } from "../../../../../../lib/pagination";
import DeleteConfirmDialog from "../../../shared/DeleteConfirmDialog";
import {
  useBlogsQuery,
  useDeleteBlog,
  useToggleBlogStatus,
} from "../../api/blogs.api";
import type { BlogApi } from "../../types/blogs.types";
import { BLOGS_PATH } from "../../utils/blogs.utils";
import { generateColumns } from "./blogs.columns";
import { LuPlus } from "react-icons/lu";

export default function BlogsTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<BlogApi | null>(null);

  const { data, isLoading, isFetching } = useBlogsQuery(page);
  const { mutateAsync: deleteBlog, isPending: isDeleting } = useDeleteBlog();
  const { mutate: toggleStatus, isPending: isToggling, variables: togglingId } =
    useToggleBlogStatus();

  const { rows, pagesCount } = getPageView(data, page);

  // لو الصفحة الحالية بقت أكبر من عدد الصفحات (بعد حذف مثلًا) ارجع لآخر صفحة
  useEffect(() => {
    if (pagesCount > 0 && page > pagesCount) setPage(pagesCount);
  }, [page, pagesCount]);

  const handleEdit = useCallback(
    (blog: BlogApi) => navigate(`${BLOGS_PATH}/${blog.id}`),
    [navigate],
  );

  const handleDelete = useCallback((blog: BlogApi) => setDeleting(blog), []);

  const handleToggle = useCallback(
    (blog: BlogApi) => toggleStatus(blog.id),
    [toggleStatus],
  );

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteBlog(deleting.id);
      setDeleting(null);
    } catch {
      // رسالة الخطأ بتظهر من onError في الـ hook
    }
  };

  const columns = useMemo(
    () =>
      generateColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onToggle: handleToggle,
        togglingId: isToggling ? togglingId : null,
      }),
    [handleEdit, handleDelete, handleToggle, isToggling, togglingId],
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">المدونات</h1>

        <Button
          type="button"
          onClick={() => navigate(`${BLOGS_PATH}/new`)}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary-gradient px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <LuPlus size={16} />
        </Button>
      </div>

      {isLoading ? (
  <Loading />
) : rows.length === 0 ? (
  <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
    <h2 className="text-xl font-semibold text-gray-800">
      لا توجد مدونات
    </h2>
    <p className="mt-2 text-sm text-gray-500">
      لا يوجد محتوى متاح للعرض حاليًا.
    </p>
  </div>
) : (
  <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
    <Table data={rows} columns={columns} />
  </div>
)}

      <Paginate
        page={page}
        pagesCount={pagesCount}
        onPageChange={handlePageChange}
      />

      <ModalTemplate
        isOpen={!!deleting}
        onClose={() => !isDeleting && setDeleting(null)}
      >
        <DeleteConfirmDialog
          title="حذف المقال"
          message={`هل أنتِ متأكدة من حذف المقال "${deleting?.title?.ar ?? ""}"؟`}
          isPending={isDeleting}
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      </ModalTemplate>
    </div>
  );
}
