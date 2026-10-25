import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../shared/components/Button/Button";
import { Table } from "../../../../../../shared/components/Table/Table";
import Paginate from "../../../../../../shared/components/pagination/Paginate";
import Loading from "../../../../../../shared/components/Loading/Loading";
import { getPageView } from "../../../../../../lib/pagination";
import {
  useBlogsQuery,
  useDeleteBlog,
  useToggleBlogStatus,
} from "../../api/blogs.api";
import type { BlogApi } from "../../types/blogs.types";
import { BLOGS_PATH } from "../../utils/blogs.utils";
import { generateColumns } from "./blogs.columns";
import { LuPlus } from "react-icons/lu";
import { deleteAlert } from "../../../../../../shared/components/alert/deleteAlert";

export default function BlogsTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);


  const { data, isLoading, isFetching } = useBlogsQuery(page);
  const { mutateAsync: deleteBlog} = useDeleteBlog();
  const { mutate: toggleStatus} =
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


  const handleToggle = useCallback(
    (blog: BlogApi) => toggleStatus(blog.id),
    [toggleStatus],
  );

      const handleDelete = useCallback((blog: BlogApi) => {
          deleteAlert({
              message: `هل أنت متأكد من حذف المقال "${blog?.title?.ar}"؟`,
              onConfirm: () => deleteBlog(blog.id),
          });
      }, []);


  const columns = useMemo(
    () =>
      generateColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
        onToggle: handleToggle,
      }),
    [handleEdit, handleDelete, handleToggle],
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

    </div>
  );
}
