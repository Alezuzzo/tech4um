import { Request, Response, NextFunction } from 'express';
import * as userRepo from '../repositories/user.repository'

export async function ctrlGetAllUsers(req: Request, res: Response, next: NextFunction){
    const allUsers = await userRepo.repGetAllUsers()
    res.json(allUsers)
}

export async function ctrlGetUser(req: Request, res: Response, next: NextFunction){
    const userId = req.params.id
    const foundUser = await userRepo.repGetUserById(parseInt(userId))
    if (!foundUser){
        res.sendStatus(404)
    }
    res.json(foundUser)
}

export async function ctrlNewUser(req: Request, res: Response, next: NextFunction){
    const {nickname, email} = req.body
    await userRepo.repNewUser({nickname, email})
    res.sendStatus(201)
}

export async function ctrlUpdateUserData(req: Request, res: Response, next: NextFunction){
    const userId = req.params.id
    const {nickname, email} = req.body
    await userRepo.repUpdateUserData(parseInt(userId), {nickname, email})
    res.sendStatus(201)
}

export async function ctrlDeleteUser(req: Request, res: Response, next: NextFunction){
    const userId = req.params.id
    await userRepo.repDeleteUser(parseInt(userId))
    res.sendStatus(204)
}