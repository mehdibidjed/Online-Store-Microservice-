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
