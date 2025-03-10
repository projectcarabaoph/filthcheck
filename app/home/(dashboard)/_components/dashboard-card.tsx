'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/app/auth/actions'
import { useUser } from '@/context/user-context'
import Image from 'next/image'
import { avatarHolder } from '@/public/assets/images'

export default function DashboardCard() {
    const user = useUser()
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <Image src={user.user_metadata.avatar_url || avatarHolder} alt='avatar' className='rounded-full' width={100} height={100} />
            <h1>{user.email}</h1>
            <Button className='bg-slate-400 hover:bg-slate-400/90' onClick={() => signOut()}>Sign Out</Button>
        </div>
    )
}
