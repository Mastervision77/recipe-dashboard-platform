import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

import { useDeleteRole, useRolesQuery } from "../../api/roles.api";
import { generateRoleColumns } from "./roles.columns";
import { Table } from "../../../../shared/components/Table/Table";
import { getPageView } from "../../../../lib/pagination";
import Paginate from "../../../../shared/components/pagination/Paginate";
import Loading from "../../../../shared/components/Loading/Loading";
import type { Role } from "../../types/roles.types";
import { ModalTemplate } from "../../../../shared/components/modal/ModalTemplate";
import { deleteAlert } from "../../../../shared/components/alert/deleteAlert";
import ViewRoleDialog from "./actions/ViewRoleDialog";


export default function RolesTable() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [isModalOpenView, setIsModalOpenView] = useState(false);
    const [selectedRole, setSelectedRole] =
        useState<Role | null>(null);

    const { data, isLoading, isFetching } = useRolesQuery(page);
    const { rows, pagesCount } = getPageView(data, page);

    const { mutateAsync: deleteRole } = useDeleteRole();

    useEffect(() => {
        if (page > pagesCount) setPage(pagesCount);
    }, [page, pagesCount]);

    const handleView = useCallback((role: Role) => {
        setSelectedRole(role);
        setIsModalOpenView(true);
    }, []);

    const handleEdit = useCallback((role: Role) => {
        navigate(`/admin/settings/roles/${role.id}`);
    }, [navigate]);

    const handleClose = useCallback(() => {
        setIsModalOpenView(false);
        setSelectedRole(null);
    }, []);

    const handleDelete = useCallback((role: Role) => {
        deleteAlert({
            message: `هل أنت متأكد من حذف الدور "${role.name}"؟`,
            onConfirm: () => deleteRole(role.id),
        });
    }, []);

    const columns = useMemo(() => generateRoleColumns({ onView: handleView, onEdit: handleEdit, onDelete: handleDelete }), [handleView, handleEdit, handleDelete]);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">الأدوار</h1>

                <Link
                    to="/admin/settings/roles/create"
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary-gradient px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    <LuPlus size={16} />
                    إضافة دور
                </Link>
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
                onPageChange={setPage}
            />


            {/* modal for details */}

            <ModalTemplate isOpen={isModalOpenView} onClose={handleClose}>
                <ViewRoleDialog
                    role={selectedRole}
                    onClose={handleClose}
                />
            </ModalTemplate>
        </div>
    );
}
