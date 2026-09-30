
import { FaRegEdit } from 'react-icons/fa'
import { Button } from '../Button/Button'

export default function EditButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="rounded-md px-3 py-1 text-sm cursor-pointer transition-colors duration-300 hover:bg-green-600 hover:text-white "
        >
            <FaRegEdit />
        </Button>
    )
}
