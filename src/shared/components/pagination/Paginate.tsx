import type { ReactNode } from "react";
import ReactPaginateModule from "react-paginate";

const ReactPaginate: typeof ReactPaginateModule =
    (ReactPaginateModule as unknown as { default?: typeof ReactPaginateModule })
        .default ?? ReactPaginateModule;

type PaginateProps = {
    /** الصفحة الحالية (بتبدأ من 1) — الـ state بيتحط في الصفحة اللي بتستخدم الكومبوننت */
    page: number;
    pagesCount?: number;
    previousLabel?: ReactNode;
    nextLabel?: ReactNode;
    onPageChange: (page: number) => void;
};

/**
 * Controlled pagination: الصفحة الحالية جاية من برّه (page) وبترجّع الصفحة الجديدة
 * عن طريق onPageChange. مفيش state داخلي ولا effects، فمفيش حاجة تتعارض مع
 * react-query أو تعمل reset غلط.
 */
const Paginate = ({
    page,
    pagesCount = 1,
    previousLabel = "السابق",
    nextLabel = "التالي",
    onPageChange,
}: PaginateProps) => {
    const totalPages = Math.max(1, pagesCount);

    // صفحة واحدة بس -> مفيش داعي يظهر
    if (totalPages <= 1) return null;

    const currentIndex = Math.min(Math.max(page, 1), totalPages) - 1;

    return (
        <nav
            className="flex items-center justify-end py-6"
            aria-label="Pagination"
        >
            <ReactPaginate
                pageCount={totalPages}
                forcePage={currentIndex}
                onPageChange={({ selected }) => onPageChange(selected + 1)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                previousLabel={previousLabel}
                nextLabel={nextLabel}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center gap-1 select-none rounded-xl border border-gray-100 p-2"
                pageClassName="relative"
                pageLinkClassName="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold text-[#006738] transition-all duration-300 hover:scale-105 hover:bg-[#006738] hover:text-white hover:shadow-md"
                activeClassName="rounded-lg"
                activeLinkClassName="!bg-[#f26f21] !text-white"
                disabledClassName="cursor-not-allowed opacity-40"
                disabledLinkClassName="cursor-not-allowed hover:scale-100 hover:bg-transparent hover:text-[#006738] hover:shadow-none"
                previousClassName="me-2"
                nextClassName="ms-2"
                previousLinkClassName="flex cursor-pointer items-center justify-center rounded-lg border-2 border-[#006738] px-4 py-2 text-sm font-semibold text-[#006738] transition-all duration-300 hover:scale-105 hover:bg-[#006738] hover:text-white hover:shadow-md"
                nextLinkClassName="flex cursor-pointer items-center justify-center rounded-lg border-2 border-[#006738] px-4 py-2 text-sm font-semibold text-[#006738] transition-all duration-300 hover:scale-105 hover:bg-[#006738] hover:text-white hover:shadow-md"
                breakClassName="flex h-10 w-10 items-center justify-center"
                breakLinkClassName="font-semibold text-[#006738]"
            />
        </nav>
    );
};

export default Paginate;
