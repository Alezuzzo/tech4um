import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function repGetUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export function repCreateUser(data: any) {
    return prisma.user.create({ data });
}

export function repUpdateUser(id: string, data: any) {
    return prisma.user.update({
        where: { id },
        data
    });

}

export async function repDeleteUser(id: string) {

  //apagar mensagens enviadas pelo usuário
  await prisma.message.deleteMany({
    where: { senderId: id }
  });

  //deleta o usuário
  return prisma.user.delete({
    where: { id }
  });
}



export async function repGetUserById(id: string) {
    return prisma.user.findUnique({
        where: { id },
    });
}