import { PrismaClient } from '../src/generated/prisma/client'
const prisma = new PrismaClient()

async function main(){
    console.log("Seed attempting...")
    const sampleUser1 = await prisma.user.create({data:{nickname:"Eduardo", email:"edu1010@email.com"}})
    const sampleUser2 = await prisma.user.create({data:{nickname:"Monica", email:"lilmonix3@email.com"}})
}

main().catch((e) => {console.error('Seeding error:', e) 
    process.exit(1)})
    .finally(()=> {prisma.$disconnect()
    console.log("Sucess.")})
