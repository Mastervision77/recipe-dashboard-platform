import { useCallback, useEffect, useMemo, useState } from "react";
import { useContactFormQuery } from "../../api/contactform.api";
import type { ContactForm } from "../../types/contact.types";
import ContactFormDialog from "./ContactFormDialog";
import { ModalTemplate } from "../../../../shared/components/modal/ModalTemplate";
import { generateColumns } from "./contactForm.columns";
import { Table } from "../../../../shared/components/Table/Table";
import Paginate from "../../../../shared/components/pagination/Paginate";
import { getPageView } from "../../../../lib/pagination";
import Loading from "../../../../shared/components/Loading/Loading";


export default function ContactFormTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] =
        useState<ContactForm | null>(null);
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching } = useContactFormQuery(page);

    const { rows, pagesCount } = getPageView(data, page);

    // لو الصفحة الحالية بقت أكبر من عدد الصفحات (بعد حذف مثلًا) ارجع لآخر صفحة
    useEffect(() => {
        if (page > pagesCount) setPage(pagesCount);
    }, [page, pagesCount]);

    const handleView = useCallback((contact: ContactForm) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedContact(null);
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
                <h1 className="text-2xl font-bold">استمارة التواصل</h1>
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
                <ContactFormDialog
                    contact={selectedContact}
                    onClose={handleClose}
                />
            </ModalTemplate>
        </div>
    );
}
