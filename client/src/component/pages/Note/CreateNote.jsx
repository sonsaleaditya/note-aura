import React, { useState } from 'react';
import axios from 'axios';
import './CreateNote.css';

function CreateNote({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [reminder, setReminder] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !tag) {
      alert('All fields except Reminder are mandatory!');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/notes/make-note`,
        {
          title,
          description,
          tag,
          reminder: reminder || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Note created successfully!');
        setTitle('');
        setDescription('');
        setTag('');
        setReminder('');
        if (onNoteCreated) onNoteCreated(response.data.note);
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-note-wrapper"> {/* Add wrapper here */}
      <div className="create-note-container">
        <h2>Create a New Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter note description"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter note tag"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reminder">Reminder (optional)</label>
            <input
              type="datetime-local"
              id="reminder"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              placeholder="Set a reminder"
            />
          </div>
          <button type="submit" className="btn-create-note" disabled={loading}>
            {loading ? 'Creating...' : 'Create Note'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
