'use server'

import { PrismaClient } from '@prisma/client'
import { hash , compare } from 'bcryptjs'

const prisma = new PrismaClient()

async function GetSiteData(siteName){
    console.log(siteName);
    try{
        const siteData = await prisma.sites.findUnique({where:{
            name:siteName
        }})
        return siteData
    }
    catch(err){
        console.log(err);
    }
}

async function GetSites(){
    try{
        const sites = await prisma.sites.findMany()
        return sites
    }
    catch(err){
        console.log(err);
    }
}

async function GetRoom(num){
    try{
        const roomData = await prisma.rooms.findUnique({where:{
            roomnumber:num
        }})
        return roomData
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

async function login(formData){
    const data = {
        email : formData.get("email"),
        password : formData.get("password")
    }

    const db = await prisma.users.findUnique({where:{
        email:data.email
    }})

    try{
        const checkpass = await compare(data.password,db.password)

        if(checkpass){
            return {status:"true",data:{
                name:db.name,
                email:db.email
            }}
        }
        else{
            return {status:"false"}
        }
    }
    catch(err){
        return {status:"false"}
    }

}

export { GetSites , createUser , login , GetRoom , GetSiteData }