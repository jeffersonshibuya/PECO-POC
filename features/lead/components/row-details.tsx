import { useGetNotes } from "@/features/notes/api/use-get-notes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns-tz";
import { Loader2 } from "lucide-react";

interface MyExpandedRowProps {
  id: string;
}

const MyExpandedRow = ({ id }: MyExpandedRowProps) => {
  const notesQuery = useGetNotes(id);
  const notes = notesQuery.data || [];
  return (
    <div className="sticky left-0 w-[95vw] bg-slate-100">
      <div className="grid grid-cols-4 p-2 gap-2">
        <div className="h-[200px] sticky overflow-auto bg-white border border-slate-300 rounded">
          {notesQuery.isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin size-20 text-primary/30" />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-primary">
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Creator</TableHead>
                  <TableHead className="text-white">Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="relative">
                {notes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell className="font-medium">
                      {format(note.createdAt || "", "MMMM dd yy")}
                    </TableCell>
                    <TableCell>Creator</TableCell>
                    <TableCell>{note.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="sticky">Dates</div>
      </div>
    </div>
  );
};

export default MyExpandedRow;
