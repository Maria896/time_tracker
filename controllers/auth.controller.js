import { acceptInvitation, createOrganization, inviteTeamMember, joinAsATeamMember, login, register, verifyUserEmail } from "../services/auth.service.js";
import { userSchema } from "../validation/userSchema.js";

// Path     :   /api/auth/signup
// Method   :   Post
// Access   :   Public
// Desc     :   Register New User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { error, value } = userSchema.validate(
      { name, email, password },
      { abortEarly: false }
    );

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(400).json({ success: false, error: errorMessage });
    }
    const { status, message } = await register(name, email, password);
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Path     :   /api/auth/verify-email/:token
// Method   :   Get
// Access   :   Public
// Desc     :   Verify email of new user
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    //console.log(token);
    const { status, message } = await verifyUserEmail(token);
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Path     :   /api/auth/login
// Method   :   Post
// Access   :   Public
// Desc     :   Login User
export const loginUser = async (req, res) => {
  const { email, password, token } = req.body;
  try {
    // const { error, value } = userSchema.validate(
    //   { email, password },
    //   { abortEarly: false }
    // );

    // if (error) {
    //   const errorMessage = error.details.map((detail) => detail.message);
    //   return res.status(400).json({ success: false, error: errorMessage });
    // }
    const { status, message, token } = await login(email, password);
    res.send({
      status: status,
      message: message,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Path     :   /api/auth/ask-for-invitation
// Method   :   Get
// Access   :   Private
// Desc     :   Send Email for membership
export const joinAsTeamMember = async(req,res)=>{
  try {
    const {email,role} = req.body;
    const { status, message } = await joinAsATeamMember(role,email);
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// Path     :   /api/auth/create-organization
// Method   :   Put
// Access   :   Private
// Desc     :   Create new organization
export const createNewOrganization = async (req, res) => {
  try {
    const { role,organization_name,industry_type,company_strength } = req.body;
    const userId = req.userId
    const { status, message } = await createOrganization(role,organization_name,industry_type,company_strength,userId);
    console.log(status)
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Path     :   /api/auth/invite-new-member
// Method   :   Put
// Access   :   Private
// Desc     :   Invite new team member
export const inviteNewTeamMember = async (req, res) => {
  try {
    const { email } = req.body;
    const ownerId = req.userId
    const { status, message } = await inviteTeamMember(email,ownerId);
    console.log(status)
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Path     :   /api/auth/accept-invitation/:token
// Method   :   Get
// Access   :   Private
// Desc     :   Accept invitation to join organization 
export const acceptInvitationFromOwner = async (req, res) => {
  try {
    const { token } = req.params;
    //console.log(token);
    const { status, message } = await acceptInvitation(token);
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};