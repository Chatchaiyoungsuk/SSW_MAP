import { useForm } from "react-hook-form"
import axios from "axios";
import { useNavigate , Link } from "react-router-dom"
import Link from 'next/link'

const Login = () => {

    const navigate = useNavigate()

    const { register, formState: { errors } , handleSubmit } = useForm();

    const onSubmit = (datas) => {
        console.log(datas);
       axios.get(`https://script.google.com/macros/s/AKfycbwpQgj4SblYS2KZCFNu12CQ603a0m6vKji1ag5SuIg-Zobeqbaz55AcgHcOGOObynIcmg/exec?key=${datas.email}`)
       .then((data) => {
        if(data.data[3] == datas.password){
            navigate("/home")
        }
        else{
            alert("รหัสผ่านผิด")
        }
       })
    }

    return(
        <>
        <div className="max-w-screen min-h-screen bg-gradient-to-tr from-green-400 to bg-yellow-400 flex justify-center items-center">
            <div>
            </div>
        </div>
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="card mx-auto w-full max-w-xl bg-base-200 p-4 m-4">
            <h1 className="text-2xl">เข้าสู่ระบบ</h1>
           
            <div className="form-control w-full my-2">
                <label className="label">
                    <span className="label-text">อีเมล</span>
                </label>
                <input type="email" placeholder="Type here" className="input input-bordered w-full" {...register("email", { required: true})} />
            </div>
         
            <div className="form-control w-full my-2">
                <label className="label">
                    <span className="label-text">รหัสผ่าน</span>
                </label>
                <input type="password" placeholder="Type here" className="input input-bordered w-full" {...register("password", { required: true})} />
            </div>
            <button type="submit" className="btn btn-primary btn-block my-2">เข้าสู่ระบบ</button>
            <Link to={`/register`}  className="btn btn-secondary btn-block my-2">ยังไม่มีบัญชี</Link>
            </form>
        </div>
        </>
    )

}

export default Login