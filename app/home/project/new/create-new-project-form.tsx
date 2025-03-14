'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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

type TNewProjectSchema = z.infer<typeof newProjectSchema>


export default function CreateNewProjecForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset
  } = useForm<TNewProjectSchema>({
    resolver: zodResolver(newProjectSchema),
    mode: 'all'
  })


  const onSubmit = (data: TNewProjectSchema) => {
    console.log(data)

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full p-4 bg-white rounded-lg outline outline-1 outline-slate-200">
      <div className='flex flex-col gap-1'>
        <label htmlFor='title' className='text-gray-700 font-medium'>App title</label>
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
        <small className='text-red-500'>{errors.title?.message}</small>
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='title' className='text-gray-700 font-medium'>Plan</label>

        <div className='w-full h-full min-h-48 min-w-48 md:max-w-48 max-h-48 rounded-md outline-[1px] outline outline-custome-pink p-4'>
          <div className='flex flex-row justify-between gap-2 items-center'>
            <small className='bg-custome-pink text-white p-1 rounded-md'>Free</small>
            <small>₱0/mo</small>
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
        <Button type='submit' disabled={!isDirty} className="bg-custome-pink disabled:opacity-5 w-full md:max-w-40 justify-center text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-custome-pink/90 transition-colors">
          Create App
        </Button>
      </div>
    </form>
  )
}
