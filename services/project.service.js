import { PrismaClient } from "@prisma/client";
import { transporter } from "../utils/email.js";

const prisma = new PrismaClient();

export const createProject = async (
  ownerId,
  prjoectName,
  employeeEmails,
  estimatedTime
) => {
  const newProject = await prisma.Project.create({
    data: {
      project_name: prjoectName,
      // estimated_time : estimatedTime,
      creator: {
        connect: {
          id: ownerId,
        },
      },
      users: {
        create: employeeEmails.map((employeeEmail) => ({
          user: { connect: { email: employeeEmail } },
        })),
      },
    },
  });
  await employeeEmails.map((email) => {
    sendnNotification(email, newProject.project_name);
  });
  return {
    status: 201,
    message: "Project Created..",
  };
};

export const getProjects = async (ownerId) => {
  const allProjects = await prisma.project.findMany({
    where: {
      creator: {
        id: ownerId,
      },
    },
  });
  return {
    status: 201,
    message: "All projects retrieved successfully.",
    allProjects,
  };
};

export const getProjectByid = async (ownerId, projectId) => {
  const project = await prisma.project.findFirst({
    where: {
      creator: {
        id: ownerId,
      },
      id: projectId,
    },
  });
  return {
    status: 201,
    message: "Project retrieved successfully.",
    project,
  };
};

export const getProjByStatus = async (ownerId, status) => {
  const projects = await prisma.project.findMany({
    where: {
      creator: {
        id: ownerId,
      },
      status: status,
    },
  });
  return {
    status: 201,
    message: "Projects retrieved successfully.",
    projects,
  };
};

const getProjectsByDate = async (ownerId, range) => {
  const currentDate = new Date();
  let startDate, endDate;

  if (range === "weekly") {
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() + 6
    );
  } else if (range === "monthly") {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
  } else {
    return res.status(400).json({ message: "Invalid date range" });
  }

  const projects = await prisma.project.findMany({
    where: {
      created_at: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return {
    status: 201,
    message: "Projects retrieved successfully.",
    projects,
  };
};

export const assignProject = async (ownerId, employeeEmail, projectId) => {
  try {
    const isEmployee = await prisma.user.findUnique({
      where: {
        email: employeeEmail,
        employee_of: {
          owner: {
            id: ownerId,
          },
        },
      },
    });
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (isEmployee) {
      if (project.status !== "COMPLETED" || project.status !== "STOPPED") {
        const userProject = await prisma.userProject.create({
          data: {
            userId: isEmployee.id,
            projectId: projectId,
          },
        });

        // Send a notification
        //   await sendnNotification(isEmployee.employee_of.owner.email, project.project_name);
        return {
          status: 201,
          message: "Member added successfully to the project.",
        };
      } else {
        throw {
          status: 409,
          message: "Project is stopped or completed",
        };
      }
    } else {
      throw {
        status: 409,
        message: "Employee does not exist; please send an invitation link.",
      };
    }
  } catch (error) {
    console.error("Error assigning project:", error);
    throw error;
  }
};

export const deleteProject = async (ownerId, projectId) => {
  const project = await prisma.project.delete({
    where: {
      creator: {
        id: ownerId,
      },
      id: projectId,
    },
  });
  return {
    status: 201,
    message: "Project Deleted successfully.",
    project,
  };
};

export const deleteMember = async(ownerId,projectId,userId)=>{
    
    try {
     
      const existingProject = await prisma.project.findUnique({
        where: { id: projectId,creatorId:ownerId },
      });
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!existingProject || !existingUser) {
        throw {
            status: 404,
            message: "Project or user not found.",
          };
      }
  
      await prisma.userProject.deleteMany({
        where: { projectId: projectId, userId: userId },
      });
      return {
        status: 200,
        message: "Member removed from the project successfully.",
      };

} catch (error) {
  console.error('Error removing member from project:', error);
}
}

export const changeStatus = async(ownerId, projectId,status)=>{
    const project = await prisma.project.update({
        where: { id: projectId,creatorId:ownerId },
        data:{
            status:status
        }
      });
      return {
        status: 200,
        message: "Project Status changed..",
      };
}

const sendnNotification = async (to, projectName) => {
  try {
    await transporter.sendMail({
      from: "admin@gmail.com",
      to: to,
      subject: `You are assigned to new project : ${projectName}`,
      html: `We are pleased to inform you that you have been assigned to a new project: ${projectName}. This project represents an exciting opportunity for our team, and we believe that your skills and expertise will make a valuable contribution.`,
    });
  } catch (error) {
    console.log("Email not sent", error);
  }
};
