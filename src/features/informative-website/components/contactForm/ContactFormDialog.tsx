import { Button } from "../../../../shared/components/Button/Button";
import InfoItem from "../../shared/Infoitems/InfoItem";
import type { ContactForm } from "../../types/contact.types";

type Props = {
    contact: ContactForm | null;
    onClose: () => void;
};

export default function ContactFormDialog({
    contact,
    onClose,
}: Props) {
    if (!contact) return null;

    return (

<>
                {/* Header */}
                <div className="bg-[#0d5c34] p-5 text-white">
                    <h2 className="text-lg font-bold">
                        بيانات رسالة التواصل
                    </h2>
                </div>

                {/* Content */}
                <div className="space-y-5 p-6">

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoItem
                            label="الاسم"
                            value={contact.name}
                        />

                        <InfoItem
                            label="البريد الإلكتروني"
                            value={contact.email}
                        />

                        <InfoItem
                            label="رقم الهاتف"
                            value={contact.phone_number}
                        />

                        <InfoItem
                            label="الموضوع"
                            value={contact.topic}
                        />
                    </div>

                    <InfoItem
                        label="الوصف"
                        value={contact.description}
                    />

                    <InfoItem
                        label="الرسالة"
                        value={contact.message}
                    />

                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-gray-100 p-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border cursor-pointer border-neutral-300 px-6 py-2 text-sm hover:bg-gray-50"
                    >
                        إغلاق
                    </Button>
                </div>
                </>
    );
}

