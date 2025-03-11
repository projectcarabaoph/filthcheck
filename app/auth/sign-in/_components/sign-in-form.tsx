"use client"

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button } from "@/components/ui/button"
import { signInWithOAuth } from "@/app/auth/actions"

export default function SignInForm() {

    return (
        <div className="flex flex-col gap-4 bg-white p-6 rounded-md outline outline-[1px] outline-gray-200 hover:outline-[2px] max-w-sm w-full min-h-80">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">FilthCheck</h2>
            <p className="text-gray-600">Sign in to continue to <b>filthcheck</b></p>

            <Button type="button" variant="default"
                className="w-full shadow-none bg-white text-black hover:bg-gray-50 border border-gray-300"
                onClick={() => signInWithOAuth('google')}>
                <Icon icon="flat-color-icons:google" width="24" height="24" />
                Sign in with Google
            </Button>

            <div className="pt-4 text-center">
                <p className="text-sm text-gray-500">
                    By continuing, you agree to our&nbsp;
                    <Link href="#" className="text-custome-pink hover:text-custome-pink/90">
                        Terms of Service
                    </Link>&nbsp;
                    and&nbsp;
                    <Link href="#" className="text-custome-pink hover:text-custome-pink/90">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div >
    )
}
