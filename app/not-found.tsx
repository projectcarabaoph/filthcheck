import paths from "@/utils/paths/paths.config"
import Link from "next/link"

const NotFound = () => {
    return (
        <div className='flex w-full min-h-dvh h-auto justify-center items-center '>
            <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-md md:text-lg lg:text-xl font-bold">404 Page not found</h1>
                <span>An error occured, we cannot find the page you we&apos;re looking for.</span>
                <Link href={paths.app.home} className='bg-custome-pink hover:bg-custome-pink/90 p-2 rounded-md text-white w-24 text-center'>Go back</Link>
            </div>
        </div>
    )
}

export default NotFound