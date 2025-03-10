
'use client'

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUpWithPassword } from '@/app/auth/actions'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import pathsConfig from '@/utils/paths/paths.config'
import Link from 'next/link'


const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    fullname: z.string().min(1),
})
export type TSignUpSchema = z.infer<typeof signUpSchema>



export default function SignUpForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    });


    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        try {
            await signUpWithPassword(values)
            reset()
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }
    return (
        <div className=" flex flex-col gap-2 justify-center items-center">
            <h1> Sign Up </h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <input {...register("email")} placeholder="email" type='email' className='bg-slate-200 p-1' />
                {errors.email && <small className='text-red-500'>{errors.email.message}</small>}
                <input {...register("password")} placeholder="password" type='password' className='bg-slate-200 p-1' />
                {errors.password && <small className='text-red-500'>{errors.password.message}</small>}
                <input {...register("fullname")} placeholder="fullname" type='text' className='bg-slate-200 p-1' />
                {errors.fullname && <small className='text-red-500'>{errors.fullname.message}</small>}
                <Button className="bg-slate-400 hover:bg-slate-400/90" type="submit">Sign Up</Button>
            </form>
            <div>
                <Link href={pathsConfig.auth.signIn} className='flex gap-2'>
                    <small>Already have an account?</small>
                    <small className='hover:text-purple-500 hover:font-bold'>Sign In</small>
                </Link>
            </div>
        </div>
    )
}
