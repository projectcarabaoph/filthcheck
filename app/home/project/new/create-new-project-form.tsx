'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCw, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createNewProject } from '../actions'
import paths from '@/utils/paths/paths.config'

const newProjectSchema = z.object({
  title: z.
    string()
    .min(1, { message: "Title is required." })
    .max(50, { message: 'Title cannot exceed 50 characters.' }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(200, { message: 'Description cannot exceed 200 characters.' }),
})

export type TNewProjectSchema = z.infer<typeof newProjectSchema>


export default function CreateNewProjecForm() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset
  } = useForm<TNewProjectSchema>({
    resolver: zodResolver(newProjectSchema),
    mode: 'all'
  })


  const onSubmit = async (data: TNewProjectSchema) => {
    try {
      await createNewProject(data)
      toast.success('New project created successfully.')
      reset()
      router.push(paths.app.home)
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full p-4 bg-white rounded-lg outline outline-1 outline-slate-200">
      <div className='flex flex-col gap-1'>
        <label htmlFor='title' className='text-gray-700 font-medium'>App Title</label>
        <div className="relative">
          <Input
            type='text'
            className="font-mono text-sm bg-secondary/50"
            {...register('title')}
          />
        </div>
        <small className='text-red-500'>{errors.title?.message}</small>
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='title' className='text-gray-700 font-medium'>Description</label>
        <div className="relative">
          <Input
            type='text'
            className="font-mono text-sm bg-secondary/50"
            {...register('description')}
          />
        </div>
        <small className='text-red-500'>{errors.description?.message}</small>
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='title' className='text-gray-700 font-medium'>Plan</label>

        <div className=' flex flex-col gap-2 w-full h-full min-h-56  md:max-w-56 max-h-56 rounded-md outline-[1px] outline outline-custome-pink p-4'>
          <div className='flex flex-row justify-between gap-2 items-center'>
            <small className='bg-custome-pink text-white p-1 rounded-md'>Free</small>
            <small>₱0/mo</small>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <div className='flex flex-row gap-2'>
              <RefreshCw className='w-5 h-5 text-slate-500' />
              <p>Unlimited post request</p>
            </div>
            <div className='flex flex-row gap-2'>
              <Globe className='w-5 h-5 text-slate-500' />
              <p>south-east-1</p>
            </div>
          </div>
        </div>

      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='title' className='text-gray-700 font-medium'>Region</label>
        <div className="relative">
          <Input
            type='text'
            className="font-mono text-slate-500 text-sm bg-secondary/50"
            value="SouthEast Asia (Singapore)"
            readOnly
          />
        </div>
      </div>

      <div className="mt-4 flex flex-row justify-end ">
        <Button type='submit' disabled={!isDirty || !isValid || isSubmitting} className="bg-custome-pink disabled:opacity-80 w-full md:max-w-40 justify-center text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-custome-pink/90 transition-colors">
          Create App
        </Button>
      </div>
    </form>
  )
}
