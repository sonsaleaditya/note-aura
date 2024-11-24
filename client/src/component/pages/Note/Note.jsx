import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Note.css';

function Note() {
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
  const [notes, setNotes] = useState([]);
  const [updatedNote, setUpdatedNote] = useState({
    title: '',
    description: '',
    tag: '',
    reminder: '', // Add reminder to the state
  });
  const [editingId, setEditingId] = useState(null); // Track which note is being edited

  useEffect(() => {
    const fetchNotes = async () => {
      if (token) {
        try {
          // Send token in the Authorization header
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/notes/fetch-notes`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            setNotes(response.data.notes);
          } else {
            alert(response.data.msg);
          }
        } catch (error) {
          console.error('Error fetching notes:', error);
          alert('Failed to fetch notes. Please try again.');
        }
      } else {
        alert('Please sign in to see notes');
      }
    };

    fetchNotes();
  }, [token]); // Re-run when token changes

  // Handle updating a note
  const handleUpdateNote = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/notes/update-note/${id}`,
        {
          title: updatedNote.title,
          description: updatedNote.description,
          tag: updatedNote.tag,
          reminder: updatedNote.reminder, // Include the reminder in the update request
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Note updated successfully!');
        setNotes(notes.map((note) =>
          note._id === id
            ? {
                ...note,
                title: updatedNote.title,
                description: updatedNote.description,
                tag: updatedNote.tag,
                reminder: updatedNote.reminder,
              }
            : note
        ));
        setEditingId(null); // Reset the editing state
        setUpdatedNote({ title: '', description: '', tag: '', reminder: '' }); // Reset input fields
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note.');
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/notes/delete-note/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setNotes(notes.filter((note) => note._id !== id));
        alert('Note deleted successfully!');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note.');
    }
  };

  return (
    <div className="notes-container">
      {token ? <h1>Notes</h1> : <h1>Please sign in to see notes</h1>}
      {notes.length > 0 ? (
        <div className="notes-list">
          {notes.map((item) => (
            <div key={item._id} className="note-card">
              {editingId === item._id ? (
                <>
                  {/* Edit Mode */}
                  <input
                    type="text"
                    value={updatedNote.title}
                    onChange={(e) => setUpdatedNote({ ...updatedNote, title: e.target.value })}
                    placeholder="Title"
                    className="note-input"
                  />
                  <textarea
                    value={updatedNote.description}
                    onChange={(e) => setUpdatedNote({ ...updatedNote, description: e.target.value })}
                    placeholder="Description"
                    className="note-textarea"
                  />
                  <input
                    type="text"
                    value={updatedNote.tag}
                    onChange={(e) => setUpdatedNote({ ...updatedNote, tag: e.target.value })}
                    placeholder="Tag"
                    className="note-input"
                  />
                  <input
                    type="datetime-local"
                    value={updatedNote.reminder}
                    onChange={(e) => setUpdatedNote({ ...updatedNote, reminder: e.target.value })}
                    placeholder="Set Reminder"
                    className="note-input"
                  />
                  <button onClick={() => handleUpdateNote(item._id)} className="update-btn">
                    Update Note
                  </button>
                </>
              ) : (
                <>
                  {/* View Mode */}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <strong>Tag:</strong> {item.tag}
                  </p>
                  <p>
                    <strong>Reminder:</strong>{' '}
                    {item.reminder ? new Date(item.reminder).toLocaleString() : 'No reminder set'}
                  </p>
                  <p>
                    <strong>Created on:</strong> {new Date(item.date).toLocaleDateString()}
                  </p>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      setEditingId(item._id) ||
                      setUpdatedNote({
                        title: item.title,
                        description: item.description,
                        tag: item.tag,
                        reminder: item.reminder || '',
                      })
                    }
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteNote(item._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2>No notes available</h2>
      )}
    </div>
  );
}

export default Note;
