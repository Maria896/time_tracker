import { assignProject, createProject, deleteProject, getProjByStatus, getProjectByid, getProjects } from "../services/project.service.js";

// Path     :   /api/project/create-project
// Method   :   Post
// Access   :   Private
// Desc     :   Create new Project
export const createNewProject= async (req, res) => {
    try {
      const { project_name,users,estimated_time } = req.body;
      const ownerId = req.user.id
      console.log(ownerId)
      const { status, message } = await createProject(ownerId,project_name,users,estimated_time);
      res.send({
        status: status,
        message: message,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
// Path     :   /api/project/projects
// Method   :   Get
// Access   :   Private
// Desc     :   Get All Projects
export const getAllProjects= async (req, res) => {
  try {
    const ownerId = req.userId
    const { status, message,allProjects } = await getProjects(ownerId);
    res.send({
      status: status,
      message: message,
      allProjects
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}; 
// Path     :   /api/project/:projectId
// Method   :   Get
// Access   :   Private
// Desc     :   Get Project By Id
export const getProjectById= async (req, res) => {
  try {
    const ownerId = req.userId
    const projectId = parseInt(req.params.projectId);
    const { status, message,project } = await getProjectByid(ownerId,projectId);
    res.send({
      status: status,
      message: message,
      project
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Path     :   /api/project/:status
// Method   :   Get
// Access   :   Private
// Desc     :   Get Project By Status
export const getProjectByStatus= async (req, res) => {
  try {
    const ownerId = req.userId
    const projectStatus = req.params.projectStatus;
    const { status, message,projects } = await getProjByStatus(ownerId,projectStatus);
    res.send({
      status: status,
      message: message,
      projects
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Path     :   /api/project/:range
// Method   :   Get
// Access   :   Private
// Desc     :   Get Project By Date Range
export const getProjectsByDateRange= async (req, res) => {
  try {
    const ownerId = req.userId
    const range = req.params.range;
    const { status, message,projects } = await getProjByStatus(ownerId,range);
    res.send({
      status: status,
      message: message,
      projects
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}; 
// Path     :   /api/project/assign-project
// Method   :   Put
// Access   :   Private
// Desc     :   Assign project to new employee
export const assignProjectToNewEmployee= async (req, res) => {
  try {
    const ownerId = req.userId
    const {email} = req.body;
    const projectId = parseInt(req.params.projectId);
    const { status, message } = await assignProject(ownerId,email,projectId);
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// Path     :   /api/project/delete-project
// Method   :   Delete
// Access   :   Private
// Desc     :   Delete Project
export const deleteProjectById= async (req, res) => {
  try {
    const ownerId = req.userId
    const projectId = parseInt(req.params.projectId);
    const { status, message } = await deleteProject(ownerId,projectId);
    res.send({
      status: status,
      message: message,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};        