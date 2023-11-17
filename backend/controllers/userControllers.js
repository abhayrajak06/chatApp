export const registerController = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async () => {};
