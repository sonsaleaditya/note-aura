const userShema = require('../../models/User.model');
const profileSchema = require("../../models/Profile.model")


const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authenticated user ID is available.

        // Destructure specific fields from req.body
        const { fName, lName, email, password, role, img, reminder, tag } = req.body;

        // Create an object with only the fields that are provided
        const updates = {};
        if (fName !== undefined) updates.fName = fName;
        if (lName !== undefined) updates.lName = lName;
        if (email !== undefined) updates.email = email;
        if (password !== undefined) updates.password = password; // Hash if required
        if (role !== undefined) updates.role = role;
        if (img !== undefined) updates.img = img;
        if (reminder !== undefined) updates.reminder = reminder;
        if (tag !== undefined) updates.tag = tag;

        // Update the user in the database
        const updatedUser = await userShema.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User updated successfully.", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user.", error });
    }
};



const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = id;
        // Deleting user and their profile (if needed)
        const deletedUser = await userShema.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Optionally delete profile associated with the user
        await profileSchema.deleteOne({ userId });

        res.status(200).json({ message: "User and profile deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user.", error });
    }
};

const fetchUserInfoById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await userShema.findById(userId).populate('profile'); // Populate the user's profile.

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user information.", error });
    }
};

const fetchAllUserInfo = async (req, res) => {
    try {
        const users = await userShema.find().populate('profile'); // Populate profiles for all users.

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users.", error });
    }
};



module.exports = {updateUser, deleteUser, fetchAllUserInfo, fetchUserInfoById}