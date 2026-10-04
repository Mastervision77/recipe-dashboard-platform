import { useCallback, useEffect, useMemo, useState } from "react";
import { ModalTemplate } from "../../../../shared/components/modal/ModalTemplate";
import { Table } from "../../../../shared/components/Table/Table";
import Paginate from "../../../../shared/components/pagination/Paginate";
import { getPageView } from "../../../../lib/pagination";
import Loading from "../../../../shared/components/Loading/Loading";
import { generateColumns } from "./survey.columns";
import { useSurveyQuery } from "../../api/survey.api";
import SurveyDialog from "./SurveyDialog";
import type { Survey } from "../../types/survey.types";


export default function SurveyTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedsurvey, setSelectedsurvey] =
        useState<Survey | null>(null);
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching } = useSurveyQuery(page);

    const { rows, pagesCount } = getPageView(data, page);


    // لو الصفحة الحالية بقت أكبر من عدد الصفحات (بعد حذف مثلًا) ارجع لآخر صفحة
    useEffect(() => {
        if (page > pagesCount) setPage(pagesCount);
    }, [page, pagesCount]);

    const handleView = useCallback((survey: Survey) => {
        setSelectedsurvey(survey);
        setIsModalOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedsurvey(null);
    }, []);

    const columns = useMemo(
        () => generateColumns({ onView: handleView }),
        [handleView],
    );

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="p-6 ">
            <div className="mb-6">
                <h1 className="text-2xl font-bold"> الاستبيان التشخيصي للمطبخ</h1>
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




            <ModalTemplate isOpen={isModalOpen} onClose={handleClose}>
                <SurveyDialog
                    survey={selectedsurvey}
                    onClose={handleClose}
                />
            </ModalTemplate>

        </div>
    );
}
