"use client"

import { Button } from "@/components/ui/button"
import { signInWithOAuth, signInWithPassword } from "@/app/auth/actions"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import paths from "@/utils/paths/paths.config"

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
export type TSignInSchema = z.infer<typeof signInSchema>

export default function SignInForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema)
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            await signInWithPassword(values)
            reset()

        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        } finally {
            redirect(paths.app.home)
        }
    }

    return (
        <div className=" flex flex-col gap-2 justify-center items-center">
            <h1> Sign In </h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <input {...register("email")} placeholder="email" type='email' className='bg-slate-200 p-1' />
                {errors.email && <small className='text-red-500'>{errors.email.message}</small>}
                <input {...register("password")} placeholder="password" type='password' className='bg-slate-200 p-1' />
                {errors.password && <small className='text-red-500'>{errors.password.message}</small>}
                <Button className="bg-slate-400 hover:bg-slate-400/90" type='submit'>Sign In</Button>
            </form>
            <span>or</span>
            <Button type="button" className="bg-slate-400 hover:bg-slate-400/90" onClick={() => signInWithOAuth('google')}>Sign in with Google</Button>
        </div>
    )
}
