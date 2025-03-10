'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { forgotPassword } from "@/app/auth/actions"

const forgotPasswordSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email(),
})

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>


const ForgotPasswordForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'all'
    });


    const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
        try {
            await forgotPassword(values.email)
            reset()
            toast.success(`
                If you signed up with email and password, 
                you’ll receive a reset email link valid for 10 minutes.`,
                {
                    duration: Infinity,
                })
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    return (
        <div className=" flex flex-col gap-2 justify-center items-center">
            <h1> Forgot Password </h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <input {...register("email")} placeholder="email" type='email' className='bg-slate-200 p-1' />
                {errors.email && <small className='text-red-500'>{errors.email.message}</small>}
                <Button className="bg-slate-400 hover:bg-slate-400/90" type='submit'>Reset Password</Button>
            </form>
        </div>
    )
}

export default ForgotPasswordForm