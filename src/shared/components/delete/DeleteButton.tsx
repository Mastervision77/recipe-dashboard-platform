import { Button } from "../Button/Button";
import { GoTrash } from "react-icons/go";


export default function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="rounded-md px-3 py-1 text-sm cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:text-white "
        >
            <GoTrash />
        </Button>
    )
}
