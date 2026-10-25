import { Button } from "../Button/Button";
import { GoTrash } from "react-icons/go";


export default function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="cursor-pointer rounded-full border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
            <GoTrash />
        </Button>
    )
}
