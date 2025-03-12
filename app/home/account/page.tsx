'use client'

import { useUser } from "@/context/user-context"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const Account = () => {

    const user = useUser()

    return (
        <div className=" flex justify-center ">
            <div className="max-w-7xl w-full p-2 flex flex-col">
                <div className="flex flex-col gap-2 p-2">
                    <h1 className="text-lg  font-bold text-gray-900 ">
                        Account
                    </h1>
                    <span className="text-sm">Manage you account information</span>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div>
                        <h2 className="text-md  font-bold text-gray-900">Profile</h2>
                        <hr />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user.user_metadata.avatar_url} alt="profile" />
                            <AvatarFallback>FC</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <span className="font-medium">{user.user_metadata.full_name}</span>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div>
                        <h2 className="text-md  font-bold text-gray-900">Email Address</h2>
                        <hr />
                    </div>
                    <div>
                        <span className="text-sm">{user.user_metadata.email}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div>
                        <h2 className="text-md  font-bold text-gray-900">Danger Zone</h2>
                        <hr />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="flex flex-col gap-2">
                            <p >Delete your account</p>
                            <p className="text-sm">Delete your account and all its associated data.</p>
                        </div>
                        <div>
                            <Button onClick={() => { }} variant='default' className="w-full text-center py-5 rounded-md border border-custome-pink bg-white text-custome-pink hover:bg-custome-pink hover:text-white">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account