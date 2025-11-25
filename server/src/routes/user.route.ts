import express from 'express'
import * as userController from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/', userController.ctrlGetAllUsers)
userRouter.get('/:id', userController.ctrlGetUser)
userRouter.post('/', userController.ctrlNewUser)
userRouter.patch('/:id', userController.ctrlUpdateUserData)
userRouter.delete('/:id', userController.ctrlDeleteUser)

export default userRouter