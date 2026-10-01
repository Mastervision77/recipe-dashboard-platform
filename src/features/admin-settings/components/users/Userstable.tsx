import { useCallback, useEffect, useMemo, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Table } from "../../../../shared/components/Table/Table";
import { getPageView } from "../../../../lib/pagination";
import Paginate from "../../../../shared/components/pagination/Paginate";
import Loading from "../../../../shared/components/Loading/Loading";
import { deleteAlert } from "../../../../shared/components/alert/deleteAlert";
import type { User } from "../../types/users.types";
import { useDeleteUser, useToggleUserStatus, useUsersQuery } from "../../api/users.api";
import { generateUserColumns } from "./users.columns";
import { ModalTemplate } from "../../../../shared/components/modal/ModalTemplate";
import { Button } from "../../../../shared/components/Button/Button";
import UpateAddDialog from "./actions/UpateAddDialog";
import ViewUserDialog from "./actions/ViewUserDialog";



export default function UsersTable() {
    const [page, setPage] = useState(1);
    const [isModalOpenView, setIsModalOpenView] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    const { data, isLoading, isFetching } = useUsersQuery(page);
    const { rows, pagesCount } = getPageView(data, page);

const { mutateAsync: toggleUserStatus } = useToggleUserStatus();
    const { mutateAsync: deleteUser } = useDeleteUser();

    useEffect(() => {
        if (page > pagesCount) setPage(pagesCount);
    }, [page, pagesCount]);

    const handleView = useCallback((user: User) => {
        setSelectedUser(user);
        setIsModalOpenView(true);
    }, []);

    const handleEdit = useCallback((user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedUser(null);
    }, []);

    const handleCloseView = useCallback(() => {
        setIsModalOpenView(false);
        setSelectedUser(null);
    }, []);

    const handleDelete = useCallback((user: User) => {
        deleteAlert({
            message: `هل أنت متأكد من حذف الموظف "${user.name}"؟`,
            onConfirm: () => deleteUser(user.id),
        });
    }, []);

    const handleAdd = useCallback(() => {
        setSelectedUser(null);
        setIsModalOpen(true);
    }, []);

   const handleStatusChange = useCallback(
    async (user: User, isActive: boolean) => {
        await toggleUserStatus({
            id: user.id,
            is_active: isActive,
        });
    },
    [toggleUserStatus]
);
const filteredUsers = rows.filter((user) => user.id !== 1);

    const columns = useMemo(() => generateUserColumns({ onView: handleView, onEdit: handleEdit, onDelete: handleDelete , onStatusChange : handleStatusChange }), [handleView, handleEdit, handleDelete , handleStatusChange]);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">الموظفين</h1>

                <Button
                    onClick={handleAdd}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary-gradient px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    <LuPlus size={16} />
                </Button>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
                    <Table data={filteredUsers} columns={columns} />
                </div>
            )}

            <Paginate
                page={page}
                pagesCount={pagesCount}
                onPageChange={setPage}
            />


            {/* modal for add and edit */}
            <ModalTemplate isOpen={isModalOpen} onClose={handleClose}>
                <UpateAddDialog
                    user={selectedUser}
                    onClose={handleClose}
                />
            </ModalTemplate>


            {/* modal for details*/}
            <ModalTemplate isOpen={isModalOpenView} onClose={handleCloseView}>
                <ViewUserDialog
                    user={selectedUser}
                    onClose={handleCloseView}
                />
            </ModalTemplate>
        </div>
    );
}
