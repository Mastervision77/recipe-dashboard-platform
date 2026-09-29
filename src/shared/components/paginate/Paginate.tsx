
import { useEffect, useState, type ReactNode } from "react";
import ReactPaginate from "react-paginate";

type PaginateProps = {
    pagesCount?: number;
    previousLabel?: ReactNode;
    nextLabel?: ReactNode;
    onPageChange: (page: number) => void;
    initialPage?: number;
    resetPagination?: boolean;
};

const Paginate = ({
    pagesCount = 1,
    previousLabel = "Previous",
    nextLabel = "Next",
    onPageChange,
    initialPage = 1,
    resetPagination = false,
}: PaginateProps) => {
    const totalPages = Math.max(1, pagesCount);

    const getPageIndex = (page: number) =>
        Math.max(0, Math.min(page - 1, totalPages - 1));

    const [currentPage, setCurrentPage] = useState(
        getPageIndex(initialPage)
    );

    useEffect(() => {
        setCurrentPage(getPageIndex(initialPage));
    }, [initialPage, pagesCount]);

    useEffect(() => {
        if (!resetPagination) return;

        setCurrentPage(0);
        onPageChange(1);
    }, [resetPagination, onPageChange]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        onPageChange(selected + 1);
    };

    return (
        <nav
            className="flex items-center justify-center py-6"
            aria-label="Pagination"
        >
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                previousLabel={previousLabel}
                nextLabel={nextLabel}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center gap-1 select-none rounded-xl border border-gray-100 p-2"
                pageClassName="relative"
                pageLinkClassName="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold text-[#006738] transition-all duration-300 hover:scale-105 hover:bg-[#006738] hover:text-white hover:shadow-md"
                activeClassName="rounded-lg"
                activeLinkClassName="bg-[#f26f21] text-white"
                disabledClassName="cursor-not-allowed opacity-40"
                disabledLinkClassName="hover:scale-100 hover:bg-transparent hover:text-[#006738] hover:shadow-none"
                previousClassName="mr-2"
                nextClassName="ml-2"
                previousLinkClassName="flex items-center justify-center rounded-lg border-2 border-[#006738] px-4 py-2 text-sm font-semibold text-[#006738] transition-all duration-300 hover:scale-105 hover:bg-[#006738] hover:text-white hover:shadow-md"
                nextLinkClassName="flex items-center justify-center rounded-lg border-2 border-[#006738] px-4 py-2 text-sm font-semibold text-[#006738] transition-all duration-300 hover:scale-105 hover:bg-[#006738] hover:text-white hover:shadow-md"
                breakClassName="flex h-10 w-10 items-center justify-center"
                breakLinkClassName="font-semibold text-[#006738]"
            />
        </nav>
    );
};

export default Paginate;
