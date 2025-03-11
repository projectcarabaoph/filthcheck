import Link from "next/link"
import { ArrowRight } from "lucide-react"
import paths from "@/utils/paths/paths.config"

const MarketingHero = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 ">
                    A simple API for detecting
                    <span className="text-custome-pink"> NSFW </span>
                    image content
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">

                    It utilizes onnx models to analyze images and classify them as either Safe or Not Safe For Work (NSFW)
                </p>
                <div className="flex gap-4 justify-center flex-col md:flex-row">
                    <Link href={paths.auth.signIn} className="bg-custome-pink justify-center text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-custome-pink/90 transition-colors">
                        Get Started <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="border-2 border-gray-300 text-gray-700 px-8 py-2 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                        View Documentation
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MarketingHero