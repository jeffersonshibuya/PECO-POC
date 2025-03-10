import { X } from "lucide-react";
import { Button } from "./ui/button";

interface DataColumnClearButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
}

const DataColumnClearButton = ({
  onClick,
  isDisabled = false,
}: DataColumnClearButtonProps) => {
  return (
    <Button
      variant={"outline"}
      onClick={onClick}
      disabled={isDisabled}
      className="relative flex w-full items-center justify-between gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5"
    >
      <div className="flex grow items-center gap-3">
        <X className="size-4" />
        <div className="grid grow gap-2">Clear Selections</div>
      </div>
    </Button>
  );
};
export default DataColumnClearButton;
