import { register } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    console.log("Mariaaaaaaaaa")
    const { name, email, password } = req.body;

    const { status, message } = await register(name, email, password);
    res.send({
        status:status,
        message:message
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
