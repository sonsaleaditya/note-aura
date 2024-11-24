const express = require('express');
const router = express.Router();
const {makeNote , fetchNotes, updateNote, deleteNote} = require('../controllers/Notes/notesController');
const {auth,isUser} = require('../middleware/Auth')
router.post('/make-note',auth,isUser,makeNote);
router.get('/fetch-notes',auth,isUser,fetchNotes);
router.put('/update-note/:id', auth, isUser, updateNote);
router.delete('/delete-note/:id', auth, isUser, deleteNote);
module.exports = router;