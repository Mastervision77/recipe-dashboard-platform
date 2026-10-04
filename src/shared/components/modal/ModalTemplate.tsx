
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type ReactNode } from "react";

type ModalTemplateProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export function ModalTemplate({
    isOpen,
    onClose,
    title,
    children,
}: ModalTemplateProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[100] "
                onClose={onClose}
            >
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                {/* Modal container */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="transform max-w-3xl w-full overflow-hidden rounded-xl bg-white  text-right align-middle shadow-xl transition-all">
                                {title && (
                                    <Dialog.Title
                                        as="h3"
                                        className="mb-5 text-lg font-bold text-brand-primary"
                                    >
                                        {title}
                                    </Dialog.Title>
                                )}

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}