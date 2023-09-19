import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const dbConnect = async ()=>{
  if (prisma.$isConnected) {
    console.log('Database is connected.');
  } else {
    console.log('Database is not connected.');
  }
}

