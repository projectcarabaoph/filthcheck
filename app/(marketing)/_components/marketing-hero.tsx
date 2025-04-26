import Link from "next/link"
import { ArrowRight } from "lucide-react"
import paths from "@/utils/paths/paths.config"
import { serverClient } from "@/utils/supabase/server-client"

export default async function MarketingHero() {

    const supabase = await serverClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="relative overflow-hidden flex flex-col items-center  text-center py-20">
            <div className="flex flex-col justify-center items-center w-full max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    A simple API for detecting
                    <span className="text-custome-pink"> NSFW </span>
                    Nudity image content
                </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                It utilizes ONNX models to analyze images for nudity and classifies them as either Safe or Not Safe For Work (NSFW).
            </p>
            <div className="w-full flex gap-4 justify-center flex-col md:flex-row">
                <Link href={user ? paths.app.home : paths.auth.signIn} className="bg-custome-pink justify-center text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-custome-pink/90 transition-colors">
                    Get Started <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="#" className="border-2 border-gray-300 text-gray-700 px-8 py-2 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                    View Documentation
                </Link>
            </div>
        </div>
    )
}


