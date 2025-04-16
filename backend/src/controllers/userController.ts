import { Request, Response } from "express";
import User from "../models/user"; // Adjust the path to your User model

export const getUserById = async (req: Request, res:Response): Promise<void> => {
  // console.log(req.params.userId)

  try {
    const user = await User.findById(req.params.userId)

    res.status(200).json({ success: true, user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Update user details
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID
    const { username, profileIcon } = req.body; // Extract fields to update

    // Validate input
    if (!username && !profileIcon) {
      res.status(400).json({ success: false, message: "No fields to update provided." });
      return;
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...(username && { username }), ...(profileIcon && { profileIcon }) },
      { new: true, runValidators: true } // Return the updated user and run validators
    );

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({ success: true, message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};