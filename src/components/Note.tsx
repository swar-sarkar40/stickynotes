
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Trash2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NoteProps {
  id: string;
  content: string;
  color: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
}

const Note = ({ id, content, color, onDelete, onUpdate }: NoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content);
  const isMobile = useIsMobile();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: color,
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(id, noteContent);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative h-40 sm:h-48 w-full rounded-lg shadow-lg p-3 sm:p-4 cursor-move transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
      {...attributes}
      {...listeners}
    >
      <button
        onClick={() => onDelete(id)}
        className={`absolute top-2 right-2 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200`}
        aria-label="Delete note"
      >
        <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>
      
      {isEditing ? (
        <textarea
          autoFocus
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onBlur={handleBlur}
          className="w-full h-full resize-none bg-transparent focus:outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
          placeholder="Write your note here..."
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="w-full h-full overflow-auto break-words text-sm sm:text-base text-gray-700 cursor-text"
        >
          {noteContent || (
            <span className="text-gray-400 italic">Click to add text</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Note;
