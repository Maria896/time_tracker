import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (ownerId,prjoectName,employeeEmails,estimatedTime)=>{

    const foundUsers = await prisma.user.findMany({
        where:{
            email: {
                in: employeeEmails
              }
        }
    })

    const newProject = await prisma.Project.create({
        data:{
            project_name: prjoectName,
            estimated_time : estimatedTime,
            creatorId : ownerId,
            employees : assignedTo,
            users:employees
        }
    })

    
}