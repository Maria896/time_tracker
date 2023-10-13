import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const startTimer = async(userId,projectId,loggedInUserId) => {
 

      const findUser = await prisma.user.findUnique({
        where:{
            id:userId,
        }
      })
      // console.log(findUser)
      const findProject = await prisma.project.findUnique({
        where:{
            id:projectId,
            // users:{
            //     userId:userId
            // }
        }
      })
      console.log(findProject)
      if(!findProject && findProject.status === "COMPLETED"){
        throw {
            status: 409,
            message: "Project Not found or project completed...",
          };
      }
      if(findUser && !userId === loggedInUserId){
        throw {
            status: 409,
            message: "You are authorized to start timer",
          };
      }
      const timer = await prisma.timer.create({
        data: {
          start_time: moment().format("hh:mm"), 
          date_toTime_entries: {
            create: {
              Date: moment().format('MMMM Do YYYY'), 
              userId: userId,
              projectId: projectId,
              
            }
          }
        },
        include: {
          date_toTime_entries: true
        }
      });
      return {
        status: 201,
        message: "Timer Started...",
      };

}