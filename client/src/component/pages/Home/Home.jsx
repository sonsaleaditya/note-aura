import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Note from '../Note/Note';

function Home() {
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          navigate("/"); // Redirect to Landing Page if not authenticated
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Assuming the notes data is in response.data.notes
        setLoading(false); // Once data is loaded, stop loading
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false); // Even on error, stop loading
      }
    };

    fetchNotes();
  }, [navigate]);

  return (
    <div>
      {/* Display loading bar while data is being fetched */}
      {loading && (
        <div className="loading-bar">
          <div className="spinner"></div>
        </div>
      )}

      {/* Render Notes Component once data is fetched */}
      {!loading && (
        <div className="notes-container">
         
          <div>
            {/* Assuming you will map and display your notes here */}
            <div> <Note/> </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
