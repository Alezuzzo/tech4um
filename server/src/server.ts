import dotenv from 'dotenv';
import app from './app';

//const { PrismaClient } = require('@prisma/client'); // wrong address, seek to fix it (and figure out the error type on the tutorial)
//const prisma = new PrismaClient();
//import { PrismaClient } from './generated/prisma/client.js'

dotenv.config();
 
const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));