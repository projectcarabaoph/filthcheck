import Link from 'next/link'
import paths from '@/utils/paths/paths.config'
type TNavLinks = {
    id: number;
    href: string;
    label: string
}
const Marketing = () => {
    const navLinks: TNavLinks[] = [

        {
            id: 1,
            href: paths.auth.signIn,
            label: 'Sign In',
        },
        {
            id: 2,
            href: paths.auth.signUp,
            label: 'Sign Up',
        },
        {
            id: 3,
            href: paths.auth.forgotPassword,
            label: 'Forgot Password',
        },
    ]
    return (
        <div className='flex w-full justify-center items-center '>
            <div className=' flex flex-col gap-2 justify-center items-center  w-full h-full max-h-80 max-w-80'>
                <h1>A very simple API for detecting Not Safe For Work (NSFW) image content</h1>
                {navLinks.map((link) => {
                    return (
                        <Link key={link.id} href={link.href} className='bg-slate-400 hover:bg-slate-400/90 p-2 rounded-md text-white w-24 text-center'>{link.label}</Link>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Marketing