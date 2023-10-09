import { PrismaClient } from "@prisma/client";
import { transporter } from "../utils/email.js";

const prisma = new PrismaClient();

export const createProject = async (ownerId,prjoectName,employeeEmails,estimatedTime)=>{

    const newProject = await prisma.Project.create({
        data:{
            project_name: prjoectName,
            // estimated_time : estimatedTime,
            creator : {
                connect:{
                    id:ownerId
                }
            },
            users: {
                create: employeeEmails.map(employeeEmail => ({
                  user: { connect: { email: employeeEmail } }
                }))
            }
        }
    })
    await employeeEmails.map(email=>{
         sendnNotification(email,newProject.project_name)
    })
    return {
        status: 201,
        message: "Project Created..",
      };  
}

export const getProjects = async(ownerId)=>{
    const allProjects = await prisma.project.findMany({
        where:{
            creator:{
                id:ownerId
            }
        }
    })
    return {
        status: 201,
        message: "All projects retrieved successfully.",
        allProjects
      };
}

export const getProjectByid = async(ownerId,projectId)=>{
    const project = await prisma.project.findFirst({
        where:{
            creator:{
                id:ownerId
            },
            id:projectId
        }
    })
    return {
        status: 201,
        message: "Project retrieved successfully.",
        project
      };
}

export const getProjByStatus = async(ownerId,status)=>{
    const projects = await prisma.project.findMany({
        where:{
            creator:{
                id:ownerId
            },
            status:status
        }
    })
    return {
        status: 201,
        message: "Projects retrieved successfully.",
        projects
      };
}

const getProjectsByDate = async (ownerId,range) => {
    
      const currentDate = new Date();
      let startDate, endDate;
  
      if (range === "weekly") {

        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6);

      } else 
      if (range === "monthly") {

        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      }
       else {
        return res.status(400).json({ message: "Invalid date range" });
      }
  
      const projects = await prisma.project.findMany({
        where: {
            created_at: {
              gte: startDate,
              lte: endDate
            }
          }
      });

      return {
        status: 201,
        message: "Projects retrieved successfully.",
        projects
      };
  
    
  };

export const assignProject = async(ownerId,employeeEmail,projectId)=>{
    const isEmployee = await prisma.user.findUnique({
        where:{
            email:employeeEmail,
            employee_of:{
                owner:{
                    id:ownerId
                }
            }
        }
    })
    if (isEmployee) {
        const {project} = getProjectByid(ownerId,projectId)
        

        const updateProject = await prisma.project.update({
            where:{
                owner:{
                    id:ownerId
                },
                id:projectId
            },
            data:{
                users:{
                    connect: [ 
                        {
                          id: isEmployee.id, 
                        },
                      ],
                }
            }
        })
        await sendnNotification(employeeEmail,project.project_name)
        return {
            status: 201,
            message: "Member Added successfully.",
          };
        
    } else {
        throw {
            status: 409,
            message: "Employee not exist please send inivitation link",
          };
    }
   
}

export const deleteProject = async(ownerId,projectId)=>{
    const project = await prisma.project.delete({
        where:{
            creator:{
                id:ownerId
            },
            id:projectId
        }
    })
    return {
        status: 201,
        message: "Project Deleted successfully.",
        project
      };
}

const sendnNotification = async (to,projectName) => {
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