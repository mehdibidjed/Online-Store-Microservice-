import { UserModel } from "../models/userModel.js";

export const createUserProfile = async (req, res) => {
  try {
    const profile = await UserModel.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const keycloakId = req.params.keycloakId;
    await UserModel.updateProfile(keycloakId, {
      address: adress,
      phone: phone_number,
    });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
