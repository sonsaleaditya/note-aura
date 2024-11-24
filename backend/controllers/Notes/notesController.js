//controllers/Notes/noteController.js

const noteSchema = require('../../models/Notes.model');
const profileSchema = require('../../models/Profile.model');
const nodeCron = require('node-cron');
const { sendMail } = require('../../configs/sendMail');
require('dotenv').config();

const makeNote = async (req, res) => {
    try {
        const { title, description, tag, reminder } = req.body;

        // Check if required fields are provided
        if (!title || !description || !tag) {
            return res.status(400).json({
                success: false,
                msg: "All Fields Are Mandatory!!"
            });
        }

        // Check if the user is authenticated
        if (!req.user) {
            return res.status(400).json({
                success: false,
                msg: "Token might have expired! Please sign in again!!"
            });
        }

        // Retrieve the authenticated user
        const user = await profileSchema.findOne({ userId: req.user.id });

        //console.log("this is user ", req.user)

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        // Create a new note
        const note = await noteSchema.create({ title, description, tag, reminder });

        // Add the note to the user's notes array
        user.notes.push(note._id);

        // Save the updated user document
        await user.save();

        // If a reminder is set, send emails
        if (reminder) {
            scheduleReminderEmails(req.user.email, title, reminder);
        }

        

        return res.status(201).json({
            success: true,
            msg: "Note created successfully",
            note, // Return the created note
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while creating note!",
            error: error.message,
        });
    }
};


const updateNote = async (req, res) => {
    try {
        const { id } = req.params; // Note ID
        const { title, description, tag, reminder } = req.body; // Updated fields
        const userId = req.user.id; // Authenticated user's ID

        // Find the user's profile
        const profile = await profileSchema.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                msg: "User profile not found.",
            });
        }

        // Check if the note belongs to the user
        if (!profile.notes.includes(id)) {
            return res.status(403).json({
                success: false,
                msg: "You are not authorized to update this note.",
            });
        }

        // Find and update the note
        const updatedNote = await noteSchema.findByIdAndUpdate(
            id,
            { title, description, tag, reminder }, // Update fields
            { new: true, runValidators: true } // Return updated document
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                msg: "Note not found.",
            });
        }

        // If a reminder is set, schedule reminder emails
        if (reminder) {
            scheduleReminderEmails(req.user.email, updatedNote.title, reminder);
        }

        return res.status(200).json({
            success: true,
            msg: "Note updated successfully!",
            note: updatedNote,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while updating the note.",
            error: error.message,
        });
    }
};


const scheduleReminderEmails = (recipientEmail, title, reminder) => {
    const reminderTime = new Date(reminder);
    const now = new Date();
    const timeDifference = reminderTime - now;

    // Send immediate "reminder set" email
    const immediateMailTitle = `Reminder Created for "${title}"`;
    const immediateMailBody = `
        <p>Hello,</p>
        <p>You have successfully set a reminder for the note titled: <strong>${title}</strong>.</p>
        <p>Reminder time: ${reminderTime.toLocaleString()}</p>
    `;
    sendMail(recipientEmail, immediateMailTitle, immediateMailBody).catch(console.error);

    // Handle reminders based on the time difference
    if (timeDifference <= 0) {
        // Reminder time has already passed
        console.log(`Reminder time for "${title}" has already passed. No emails will be scheduled.`);
        return;
    } else if (timeDifference <= 10 * 60 * 1000) {
        // Reminder is less than 10 minutes away
        const reminderMailTitle = `Reminder: Time Reached for "${title}"`;
        const reminderMailBody = `
            <p>Hello,</p>
            <p>This is a reminder for the note titled: <strong>${title}</strong>.</p>
            <p>Reminder time: ${reminderTime.toLocaleString()}</p>
        `;
        sendMail(recipientEmail, reminderMailTitle, reminderMailBody).catch(console.error);
        return;
    }

    // Schedule "1 hour before" email
    const oneHourBeforeTime = new Date(reminderTime.getTime() - 60 * 60 * 1000);
    if (oneHourBeforeTime > now) {
        nodeCron.schedule(formatCronTime(oneHourBeforeTime), () => {
            const oneHourMailTitle = `Reminder: 1 Hour Left for "${title}"`;
            const oneHourMailBody = `
                <p>Hello,</p>
                <p>This is a reminder that you have 1 hour left for the note titled: <strong>${title}</strong>.</p>
                <p>Reminder time: ${reminderTime.toLocaleString()}</p>
            `;
            sendMail(recipientEmail, oneHourMailTitle, oneHourMailBody).catch(console.error);
        });
    }

    // Schedule "10 minutes before" email
    const tenMinutesBeforeTime = new Date(reminderTime.getTime() - 10 * 60 * 1000);
    if (tenMinutesBeforeTime > now) {
        nodeCron.schedule(formatCronTime(tenMinutesBeforeTime), () => {
            const tenMinuteMailTitle = `Reminder: 10 Minutes Left for "${title}"`;
            const tenMinuteMailBody = `
                <p>Hello,</p>
                <p>This is a reminder that you have 10 minutes left for the note titled: <strong>${title}</strong>.</p>
                <p>Reminder time: ${reminderTime.toLocaleString()}</p>
            `;
            sendMail(recipientEmail, tenMinuteMailTitle, tenMinuteMailBody).catch(console.error);
        });
    }

    // Schedule the final "reminder time reached" email
    if (reminderTime > now) {
        nodeCron.schedule(formatCronTime(reminderTime), () => {
            const reminderMailTitle = `Reminder: Time Reached for "${title}"`;
            const reminderMailBody = `
                <p>Hello,</p>
                <p>This is a reminder for the note titled: <strong>${title}</strong>.</p>
                <p>Reminder time: ${reminderTime.toLocaleString()}</p>
            `;
            sendMail(recipientEmail, reminderMailTitle, reminderMailBody).catch(console.error);
        });
    }
};




// Helper function to format a Date object into a cron-compatible string
const formatCronTime = (date) => {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const dayOfWeek = '*'; // Every day of the week

    return `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
};



const fetchNotes = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from authenticated user

        const profile = await profileSchema.findOne({ userId: userId }).populate("notes"); // Populate notes if they are references

        if (!profile || !profile.notes || profile.notes.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Notes not available!",
            });
        }



        return res.status(200).json({
            success: true,
            msg: "Notes fetched successfully!",
            notes: profile.notes, // Return the notes array
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while fetching notes.",
            error: error.message,
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params; // Note ID
        const userId = req.user.id; // Authenticated user's ID

        // Find the user's profile
        const profile = await profileSchema.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                msg: "User profile not found.",
            });
        }

        // Check if the note belongs to the user
        if (!profile.notes.includes(id)) {
            return res.status(403).json({
                success: false,
                msg: "You are not authorized to delete this note.",
            });
        }

        // Remove the note from the user's notes array
        profile.notes = profile.notes.filter((noteId) => noteId.toString() !== id);
        await profile.save();

        // Delete the note from the database
        await noteSchema.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            msg: "Note deleted successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error occurred while deleting the note.",
            error: error.message,
        });
    }
};


module.exports = { makeNote, fetchNotes, updateNote, deleteNote }