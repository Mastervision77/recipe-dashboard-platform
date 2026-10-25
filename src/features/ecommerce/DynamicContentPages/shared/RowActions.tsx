
import EditButton from "../../../../shared/components/edit/EditButton";
import DeleteButton from "../../../../shared/components/delete/DeleteButton";
import ViewButtons from "../../../../shared/components/view/ViewButtons";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
};

export default function RowActions({ onEdit, onDelete, onView }: Props) {
  return (
    <div className="flex items-center gap-2">

      {onView && (
        <ViewButtons onClick={() => onView()} />
      )}

      {onEdit && (
        <EditButton onClick={() => onEdit()} />
      )}
      
      {onDelete && (
        <DeleteButton onClick={() => onDelete()} />
      )}
    </div>
  );
}
