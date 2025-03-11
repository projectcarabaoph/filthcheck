import React from 'react'

export default function MarketingFooter() {
    return (
        <footer className="bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="ml-2 text-xl font-bold text-white">FilthCheck</span>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                    </div>
                    <p className="text-gray-400 text-sm mt-4 md:mt-0">
                        © {new Date().getFullYear()} FilthCheck. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
