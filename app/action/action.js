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

export { GetSites }