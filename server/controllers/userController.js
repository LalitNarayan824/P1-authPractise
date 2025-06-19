import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  const { userId } = req;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "user does not exist" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist" });
    }

    return res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
