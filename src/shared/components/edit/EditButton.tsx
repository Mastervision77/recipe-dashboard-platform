
import { FiEdit2 } from 'react-icons/fi'
import { Button } from '../Button/Button'

export default function EditButton({ onClick  }: { onClick: () => void }) {
    return (
        <Button
            type="button"
            onClick={onClick}
            
            className="cursor-pointer rounded-full border border-neutral-200 p-2 text-[#0d5c34] transition hover:bg-green-50 disabled:opacity-50"
        >
            <FiEdit2 size={16} />
        </Button>
    )
}
