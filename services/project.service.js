import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (owner,prjoectName,employees,estimatedTime)=>{

    const newProject = await prisma.Project.create({
        data:{
            project_name: prjoectName,
            estimated_time : estimatedTime,
            creatorId : owner,
            employees : employees,
            users:employees
        }
    })

    
}