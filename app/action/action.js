'use server'

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function GetSites(){
    try{
        const sites = await prisma.sites.findMany()
        return sites
    }
    catch(err){
        console.log(err);
    }
}

async function createUser(formData){
    const data = {
        email : formData.get("email"),
        name : formData.get("name"),
        password : await hash(formData.get("password"),10)
    }
    try{
        const res = await prisma.users.create({data})
        return {status:"sucess"}
    }
    catch(err){
        console.log(err);
        return {status:"error"}
    }
    
}

export { GetSites , createUser }