import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const dbConnect = async ()=>{
  try {
    await prisma.$connect();
    console.log('Database is connected.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

