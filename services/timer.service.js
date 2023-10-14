import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const startTimer = async (userId, projectId, loggedInUserId) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (!findUser) {
    throw {
      status: 404,
      message: "User Not Found...",
    };
  }

  const findProject = await prisma.project.findUnique({
    where: {
      id: projectId,
    }
  });

  if (!findProject) {
    throw {
      status: 404,
      message: "Project Not Found...",
    };
  }
  if (findProject && Array.isArray(findProject.users)) {
    const isProjectAssigned = findProject.users.some((user) => user.id == userId);
  
    if (!isProjectAssigned || findProject.status !== "IN_PROGRESS") {
      throw {
        status: 403,
        message: "You are not authorized to start the timer for this project...",
      };
    }
  } 

  if (userId !== loggedInUserId) {
    throw {
      status: 403,
      message: "You are not authorized to start the timer for this user...",
    };
  }

  let existingDateEntry = await prisma.DateToTimer.findFirst({
    where: {
      Date: moment().format('MM-DD-YYYY'),
      userId: userId,
      projectId: projectId,
    },
  });
let newDateEntry;
  if (!existingDateEntry) {
    newDateEntry = await prisma.DateToTimer.create({
      data: {
        Date: moment().format('MM-DD-YYYY'),
        userId: userId,
        projectId: projectId,
      },
    });
 
  const timer = await prisma.timer.create({
    data: {
      start_time: moment().format("hh:mm"),
      date_toTime_entries: {
        connect: { id: newDateEntry?.id || existingDateEntry?.id },
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
};
}
