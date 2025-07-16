import React, { useState, useMemo } from 'react';
import { useChatStore } from '../store/store';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Chatroom } from '../chat/Chatroom';

export const Dashboard: React.FC = () => {
  const chatrooms = useChatStore((s) => s.chatrooms);
  const createChatroom = useChatStore((s) => s.createChatroom);
  const deleteChatroom = useChatStore((s) => s.deleteChatroom);
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedChatroom, setSelectedChatroom] = useState<string | null>(null);

  // Debounced search
  const [debounced, setDebounced] = useState('');
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const filtered = useMemo(
    () =>
      chatrooms.filter((c) =>
        c.title.toLowerCase().includes(debounced.toLowerCase())
      ),
    [chatrooms, debounced]
  );

  const handleCreate = () => {
    if (!newTitle.trim()) {
      toast.error('Chatroom title required');
      return;
    }
    setCreating(true);
    setTimeout(() => {
      createChatroom(newTitle.trim());
      toast.success('Chatroom created');
      setNewTitle('');
      setCreating(false);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteChatroom(id);
      toast.success('Chatroom deleted');
      setDeletingId(null);
      if (selectedChatroom === id) setSelectedChatroom(null);
    }, 500);
  };

  if (selectedChatroom) {
    return <Chatroom chatroomId={selectedChatroom} />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Chatrooms</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Search chatrooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="New chatroom title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
        />
        <Button onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating...' : 'Create'}
        </Button>
      </div>
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {filtered.length === 0 && (
          <li className="py-4 text-center text-zinc-500">No chatrooms found.</li>
        )}
        {filtered.map((room) => (
          <li key={room.id} className="flex items-center justify-between py-3 group">
            <span
              className="font-medium cursor-pointer hover:underline"
              tabIndex={0}
              role="button"
              onClick={() => setSelectedChatroom(room.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedChatroom(room.id)}
              aria-label={`Open chatroom ${room.title}`}
            >
              {room.title}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(room.id)}
              disabled={deletingId === room.id}
              className="opacity-0 group-hover:opacity-100 transition"
            >
              {deletingId === room.id ? 'Deleting...' : 'Delete'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 