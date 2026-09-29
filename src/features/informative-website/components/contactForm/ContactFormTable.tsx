import { useCallback, useMemo, useState } from "react";
import { useContactFormQuery } from "../../api/contactform.api";
import type { ContactForm } from "../../types/contact.types";
import ContactFormDialog from "./ContactFormDialog";
import { ModalTemplate } from "../../../../shared/components/modal/ModalTemplate";
import { generateColumns } from "./contactForm.columns";
import { Table } from "../../../../shared/components/Table/Table";

export default function ContactFormTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] =
        useState<ContactForm | null>(null);

    const { data, isLoading } = useContactFormQuery();

    const handleView = useCallback((contact: ContactForm) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
        setSelectedContact(null);
    }, []);

    const columns = useMemo(
        () =>
            generateColumns({
                onView: handleView,
            }),
        [handleView]
    );

    const contacts = data?.data ?? [];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    استمارة التواصل
                </h1>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    data={contacts}
                    columns={columns}
                    enableDnD={false}
                />
            )}

            <ModalTemplate
                isOpen={isModalOpen}
                onClose={handleClose}
            >
                <ContactFormDialog
                    contact={selectedContact}
                    onClose={handleClose}
                />
            </ModalTemplate>
        </div>
    );
}