
import { FaEye } from 'react-icons/fa'
import { Button } from '../Button/Button'

export default function ViewButtons({ onClick }: { onClick: () => void }) {
   return (
      <Button
         type="button"
         onClick={onClick}
         className="rounded-md px-3 py-1 text-sm cursor-pointer hover:bg-gray-300"
      >
         <FaEye />
      </Button>
   )
}
