import Link from "next/link";
import { ArrowRight } from "lucide-react";
import paths from "@/utils/paths/paths.config";

export default function MarketingCta() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col px-4 py-16 items-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
                <p className="text-xl text-gray-600 mb-8 text-center">
                    Join Tens of users building amazing applications with our API platform.
                </p>
                <Link href={paths.auth.signIn} className="bg-custome-pink text-white  px-8 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-custome-pink/90 transition-colors ">
                    Start Building Today <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
