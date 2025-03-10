"use client";

import { useGetNotes } from "../api/use-get-notes";

const NotesList = (leadId: string) => {
  const notesQuery = useGetNotes(leadId);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {(notesQuery?.data || []).map((note) => (
          <li key={note.id}>{note.note}</li>
        ))}
      </ul>
    </div>
  );
};
export default NotesList;
