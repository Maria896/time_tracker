import { createProject } from "../services/project.service.js";

// Path     :   /api/auth/create-project
// Method   :   Post
// Access   :   Private
// Desc     :   Create new Project
export const createNewProject= async (req, res) => {
    try {
      const { prjoect_name,employees,estimated_time } = req.body;
      const ownerId = req.userId
      const { status, message } = await createProject(ownerId,prjoect_name,employees,estimated_time);
      console.log(status)
      res.send({
        status: status,
        message: message,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };