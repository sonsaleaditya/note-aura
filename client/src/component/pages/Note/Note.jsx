import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import './Note.css';

function Note() {
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
  const [notes, setNotes] = useState([]);
  const [progress, setProgress] = useState(0); // State for the loading bar
  const [updatedNote, setUpdatedNote] = useState({
    title: '',
    description: '',
    tag: '',
    reminder: '', // Add reminder to the state
  });
  const [editingId, setEditingId] = useState(null); // Track which note is being edited
  const [message, setMessage] = useState(null); // For displaying success/error messages

  useEffect(() => {
    const fetchNotes = async () => {
      if (token) {
        setProgress(30); // Start progress
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/notes/fetch-notes`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            setNotes(response.data.notes);
            setProgress(100); // Complete progress
          } else {
            setMessage({ text: response.data.msg, type: 'error' });
            setProgress(0); // Reset progress on error
          }
        } catch (error) {
          console.error('Error fetching notes:', error);
          setMessage({ text: 'Failed to fetch notes. Please try again.', type: 'error' });
          setProgress(0); // Reset progress on error
        }
      } else {
        setMessage({ text: 'Please sign in to see notes', type: 'error' });
      }
    };

    fetchNotes();
  }, [token]); // Re-run when token changes

  // Handle updating a note
  const handleUpdateNote = async (id) => {
    setProgress(30); // Start progress for updating
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
        setMessage({ text: 'Note updated successfully!', type: 'success' });
        setNotes(
          notes.map((note) =>
            note._id === id
              ? {
                  ...note,
                  title: updatedNote.title,
                  description: updatedNote.description,
                  tag: updatedNote.tag,
                  reminder: updatedNote.reminder,
                }
              : note
          )
        );
        setEditingId(null);
        setUpdatedNote({ title: '', description: '', tag: '', reminder: '' });
        setProgress(100); // Complete progress
      } else {
        setMessage({ text: response.data.msg, type: 'error' });
        setProgress(0); // Reset progress on error
      }
    } catch (error) {
      console.error('Error updating note:', error);
      setMessage({ text: 'Failed to update note.', type: 'error' });
      setProgress(0); // Reset progress on error
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (id) => {
    setProgress(30); // Start progress for deletion
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/notes/delete-note/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setNotes(notes.filter((note) => note._id !== id));
        setMessage({ text: 'Note deleted successfully!', type: 'success' });
        setProgress(100); // Complete progress
      } else {
        setMessage({ text: response.data.msg, type: 'error' });
        setProgress(0); // Reset progress on error
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      setMessage({ text: 'Failed to delete note.', type: 'error' });
      setProgress(0); // Reset progress on error
    }
  };

  return (
    <div className="notes-container">
      <LoadingBar
        color="white" // White loading bar color as requested
        progress={progress}
        onLoaderFinished={() => setProgress(0)} // Reset progress after it completes
      />
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
                    onChange={(e) =>
                      setUpdatedNote({ ...updatedNote, title: e.target.value })
                    }
                    placeholder="Title"
                    className="note-input"
                  />
                  <textarea
                    value={updatedNote.description}
                    onChange={(e) =>
                      setUpdatedNote({
                        ...updatedNote,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                    className="note-textarea"
                  />
                  <input
                    type="text"
                    value={updatedNote.tag}
                    onChange={(e) =>
                      setUpdatedNote({ ...updatedNote, tag: e.target.value })
                    }
                    placeholder="Tag"
                    className="note-input"
                  />
                  <input
                    type="datetime-local"
                    value={updatedNote.reminder}
                    onChange={(e) =>
                      setUpdatedNote({
                        ...updatedNote,
                        reminder: e.target.value,
                      })
                    }
                    placeholder="Set Reminder"
                    className="note-input"
                  />
                  <button
                    onClick={() => handleUpdateNote(item._id)}
                    className="update-btn"
                  >
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
                    {item.reminder
                      ? new Date(item.reminder).toLocaleString()
                      : 'No reminder set'}
                  </p>
                  <p>
                    <strong>Created on:</strong>{' '}
                    {new Date(item.date).toLocaleDateString()}
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
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteNote(item._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2>Write your first note!</h2> // Message when no notes are available
      )}
    </div>
  );
  


}

export default Note;
