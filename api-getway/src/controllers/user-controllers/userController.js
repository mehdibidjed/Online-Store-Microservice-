import axios from "axios";

export const getUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Fetching user with ID:", id);
    const response = await axios.get(
      `http://localhost:3001/users/get-profile/${req.params.id}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Update user by ID:", id);
    const response = await axios.put(
      `http://localhost:3001/users/update-profile/${req.params.id}`,
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error update user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUserProfile = async (req, res) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/users/create-profile`,
      req.body
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
