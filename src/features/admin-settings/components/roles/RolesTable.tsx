import { useEffect, useMemo, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { useRolesQuery } from "../../api/roles.api";
import { generateRoleColumns } from "./roles.columns";
import RoleFormDialog from "./RoleFormDialog";
import { Table } from "../../../../shared/components/Table/Table";
import { ModalTemplate } from "../../../../shared/components/modal/ModalTemplate";
import { Button } from "../../../../shared/components/Button/Button";
import { getPageView } from "../../../../lib/pagination";
import Paginate from "../../../../shared/components/pagination/Paginate";


export default function RolesTable() {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isFetching } = useRolesQuery(page);
    const { rows, pagesCount } = getPageView(data, page);

    useEffect(() => {
        if (page > pagesCount) setPage(pagesCount);
    }, [page, pagesCount]);

    const columns = useMemo(() => generateRoleColumns(), []);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">الأدوار</h1>

                <Button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    <LuPlus size={16} />
                    إضافة دور
                </Button>
            </div>

            {isLoading ? (
                <div>Loading...</div>
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

            <ModalTemplate
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                {/* بيتعمل mount جديد مع كل فتح، فالفورم بيبدأ فاضي */}
                <RoleFormDialog onClose={() => setIsModalOpen(false)} />
            </ModalTemplate>
        </div>
    );
}
