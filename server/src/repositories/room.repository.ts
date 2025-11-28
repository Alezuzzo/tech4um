import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function repGetAllRooms() {
    return prisma.room.findMany()
}

export async function repNewRoom(data: { name: string, description?: string, creatorId: string }) {
    return prisma.room.create({ data })
}

export async function repGetRoomById(id: string) {
    return prisma.room.findUnique({ where: { id } })
}

export async function repUpdateRoomInfo(id: string, data: any) {
    return prisma.room.update({ where: { id }, data })
}

export async function repDeleteRoom(id: string) {
    return prisma.room.delete({ where: { id } })
}

export async function repJoinRoom(userId: string, roomId: string) {
    return prisma.room.update({
        where: { id: roomId },
        data: {
            usersInRoom: {
                connect: { id: userId }
            }
        }
    })
}

export async function repLeaveRoom(userId: string, roomId: string) {
    return prisma.room.update({
        where: { id: roomId },
        data: {
            usersInRoom: {
                disconnect: { id: userId }
            }
        }
    })
}
