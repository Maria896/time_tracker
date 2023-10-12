import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const startTimer = async(userId,projectId,loggedInUserId) => {
    // Get the current time (hours, minutes, seconds)
    const currentDate = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    // Create a new Timer record with the current time
    const startTime = {
        hours,
        minutes,
        seconds,
      };
      const findUser = await prisma.user.findUnique({
        where:{
            id:userId,
            assigned_projects:{
                projectId:projectId
            }
        }
      })
      const findProject = await prisma.project.findUnique({
        where:{
            id:projectId,
            users:{
                userId:userId
            }
        }
      })
      if(!findProject){
        throw {
            status: 409,
            message: "Project Not found...",
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
          start_time: startTime,
          end_time: null, // Initially set to null as the timer is running
          date_toTime_entries: {
            create: {
              Date: currentDate,
              userId,
              projectId,
              total_time: null, // Initially set to null as the timer is running
            },
          },
        },
        include: {
          date_toTime_entries: true,
        },
      });
      return {
        status: 201,
        message: "Timer Started...",
      };

}