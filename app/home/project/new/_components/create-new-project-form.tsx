'use client'

import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCw, Globe, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { createNewProject } from '@/app/home/project/actions'
import paths from '@/utils/paths/paths.config'
import { newProjectSchema } from '@/app/home/project/_lib/schemas'



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
      router.replace(paths.app.home)
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full  p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='title' className='text-gray-700 font-medium text-sm'>App Title</label>
        <div className="relative">
          <Input
            autoComplete='off'
            type='text'
            placeholder='My Awesome App'
            className="font-mono text-sm bg-gray-50 border-gray-200 hover:border-gray-300 focus:bg-white focus:ring-2 focus:ring-pink-200"
            {...register('title')}
          />
        </div>
        {errors.title && (
          <small className='text-red-500 text-xs'>{errors.title.message}</small>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='description' className='text-gray-700 font-medium text-sm'>Description</label>
        <div className="relative">
          <Input
            autoComplete='off'
            type='text'
            placeholder='What does your app do?'
            className="font-mono text-sm bg-gray-50 border-gray-200 hover:border-gray-300 focus:bg-white focus:ring-2 focus:ring-pink-200"
            {...register('description')}
          />
        </div>
        {errors.description && (
          <small className='text-red-500 text-xs'>{errors.description.message}</small>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-gray-700 font-medium text-sm'>Plan</label>
        <div className='flex flex-col gap-3 w-full h-full min-h-[200px] border-2 border-pink-100  rounded-lg p-5'>
          <div className='flex flex-row justify-between items-center'>
            <span className={`text-xs font-medium px-2 py-1 rounded-md bg-emerald-100 text-emerald-800'
                            }`}>
              FREE
            </span>
            <span className='font-medium text-gray-900'>₱0/mo</span>
          </div>
          <div className='flex flex-col gap-3 mt-2'>
            <div className='flex items-center gap-3'>
              <RefreshCw className='w-4 h-4 text-pink-500' />
              <p className='text-sm text-gray-700'>Unlimited post requests</p>
            </div>
            <div className='flex items-center gap-3'>
              <Globe className='w-4 h-4 text-pink-500' />
              <p className='text-sm text-gray-700'>South-East Asia (Singapore)</p>
            </div>
          </div>
          <div className="mt-auto pt-4">
            <p className="text-xs text-gray-500">Start with our free plan and upgrade anytime</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='region' className='text-gray-700 font-medium text-sm'>Region</label>
        <div className="relative">
          <Input
            disabled
            type='text'
            className="font-mono text-sm bg-gray-100 text-gray-600 border-gray-200 cursor-not-allowed"
            value="SouthEast Asia (Singapore)"
            readOnly
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type='submit'
          disabled={!isDirty || !isValid || isSubmitting}
          className="bg-pink-600 hover:bg-pink-700 disabled:opacity-70 w-full md:w-auto justify-center text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create App'
          )}
        </Button>
      </div>
    </form>
  )
}
