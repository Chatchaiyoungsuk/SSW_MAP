'use server'

import { PrismaClient } from '@prisma/client'

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
        password : formData.get("password")
    }
}

export { GetSites , createUser }