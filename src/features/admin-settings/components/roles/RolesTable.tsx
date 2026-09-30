import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

import { useRolesQuery } from "../../api/roles.api";
import { generateRoleColumns } from "./roles.columns";
import { Table } from "../../../../shared/components/Table/Table";
import { getPageView } from "../../../../lib/pagination";
import Paginate from "../../../../shared/components/pagination/Paginate";
import Loading from "../../../../shared/components/Loading/Loading";


export default function RolesTable() {
    const [page, setPage] = useState(1);

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
        </div>
    );
}
