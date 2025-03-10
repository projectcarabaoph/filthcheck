"use client"

import { Button } from "@/components/ui/button"
import { signInWithOAuth } from "@/app/auth/actions"

export default function SignInForm() {

    return (
        <div className=" flex flex-col gap-2 justify-center items-center">
            <Button type="button" className="bg-slate-400 hover:bg-slate-400/90" onClick={() => signInWithOAuth('google')}>Sign in with Google</Button>
        </div>
    )
}
