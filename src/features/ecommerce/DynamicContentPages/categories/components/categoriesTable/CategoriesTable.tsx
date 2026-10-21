import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../../../../../../shared/components/Button/Button";
import { ModalTemplate } from "../../../../../../shared/components/modal/ModalTemplate";
import { Table } from "../../../../../../shared/components/Table/Table";
import Paginate from "../../../../../../shared/components/pagination/Paginate";
import Loading from "../../../../../../shared/components/Loading/Loading";
import { getPageView } from "../../../../../../lib/pagination";
import DeleteConfirmDialog from "../../../shared/DeleteConfirmDialog";
import { useCategoriesQuery, useDeleteCategory } from "../../api/categories.api";
import type { CategoryApi } from "../../types/categories.types";
import { generateColumns } from "./categories.columns";
import CategoryFormDialog from "./CategoryFormDialog";

export default function CategoriesTable() {
  const [page, setPage] = useState(1);

  // نفس المودال للإضافة والتعديل: null = إضافة
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryApi | null>(null);
  const [deleting, setDeleting] = useState<CategoryApi | null>(null);

  const { data, isLoading, isFetching } = useCategoriesQuery(page);
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();

  const { rows, pagesCount } = getPageView(data, page);

  // لو الصفحة الحالية بقت أكبر من عدد الصفحات (بعد حذف مثلًا) ارجع لآخر صفحة
  useEffect(() => {
    if (pagesCount > 0 && page > pagesCount) setPage(pagesCount);
  }, [page, pagesCount]);

  const openAdd = () => {
    setEditing(null);
    setIsFormOpen(true);
  };

  const handleEdit = useCallback((category: CategoryApi) => {
    setEditing(category);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditing(null);
  }, []);

  const handleDelete = useCallback((category: CategoryApi) => {
    setDeleting(category);
  }, []);

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteCategory(deleting.id);
      setDeleting(null);
    } catch {
      // رسالة الخطأ بتظهر من onError في الـ hook
    }
  };

  const columns = useMemo(
    () => generateColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [handleEdit, handleDelete],
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">تصنيفات المدونة</h1>

        <Button
          type="button"
          onClick={openAdd}
          className="cursor-pointer rounded-full bg-[#0d5c34] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#094a29]"
        >
          + إضافة تصنيف
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

      <ModalTemplate isOpen={isFormOpen} onClose={handleCloseForm}>
        {/* key عشان الفورم يتصفّر بين الإضافة والتعديل */}
        <CategoryFormDialog
          key={editing?.id ?? "new"}
          category={editing}
          onClose={handleCloseForm}
        />
      </ModalTemplate>

      <ModalTemplate
        isOpen={!!deleting}
        onClose={() => !isDeleting && setDeleting(null)}
      >
        <DeleteConfirmDialog
          title="حذف التصنيف"
          message={`هل أنتِ متأكدة من حذف التصنيف "${deleting?.name?.ar ?? ""}"؟`}
          isPending={isDeleting}
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      </ModalTemplate>
    </div>
  );
}
