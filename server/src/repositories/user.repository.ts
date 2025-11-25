import { PrismaClient } from '../../generated/prisma/client'

const prisma = new PrismaClient()

export async function repGetAllUsers(){
    return prisma.user.findMany()
}

export async function repNewUser(data: {nickname: string, email: string}){
    return prisma.user.create({data})
}

export async function repGetUserById(id: number){
    return prisma.user.findUnique({where: {id}})
}

export async function repUpdateUserData(id: number, updatedData: {nickname: string, email: string}){
    return prisma.user.update({where: {id}, data: updatedData})
}

export async function repDeleteUser(id: number){
    return prisma.user.delete({where: {id}})
}