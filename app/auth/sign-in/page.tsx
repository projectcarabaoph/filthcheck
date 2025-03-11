import SignInForm from "@/app/auth/sign-in/_components/sign-in-form"
import AuthNavigation from "../_components/auth-navigation"

const SignIn = () => {
    return (
        <div className='flex w-full min-h-dvh h-auto justify-center items-center '>
            <AuthNavigation />
            <SignInForm />
        </div>
    )
}

export default SignIn