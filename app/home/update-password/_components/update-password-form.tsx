'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { updatePassword } from '@/app/home/update-password/actions'
import pathsConfig from '@/utils/paths/paths.config'

const updatePasswordSchema = z.object({
    password: z.string().min(6),
})

export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>

const UpdatePasswordForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<TUpdatePasswordSchema>({
        resolver: zodResolver(updatePasswordSchema),
        mode: 'all'
    })

    const onSubmit = async (values: z.infer<typeof updatePasswordSchema>) => {
        try {
            await updatePassword(values.password)
            reset()
            toast.success('Password updated successfully')
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        } finally {
            redirect(pathsConfig.app.home)
        }

    }
    return (
        <div className=" flex flex-col gap-2 justify-center items-center">
            <h1> Update Password </h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <input {...register("password")} placeholder="password" type='password' className='bg-slate-200 p-1' />
                {errors.password && <small className='text-red-500'>{errors.password.message}</small>}
                <Button className="bg-slate-400 hover:bg-slate-400/90" type='submit'>Update Password</Button>
            </form>

        </div>
    )
}

export default UpdatePasswordForm