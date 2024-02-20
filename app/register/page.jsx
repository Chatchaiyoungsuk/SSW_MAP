"use client"

import { useForm } from "react-hook-form";
import { createUser } from "../action/action"

export default function Page(){
    
    const { register, handleSubmit } = useForm();

    return(
        <>
        <div>
            <form className="">

            </form>
        </div>
        </>
    )
}