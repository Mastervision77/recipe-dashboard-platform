
import { FaEye } from 'react-icons/fa'
import { Button } from '../Button/Button'

export default function ViewButtons({ onClick }: { onClick: () => void }) {
   return (
      <Button
         type="button"
         onClick={onClick}
         className="cursor-pointer rounded-full border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-300 disabled:opacity-50"
      >
         <FaEye />
      </Button>
   )
}
