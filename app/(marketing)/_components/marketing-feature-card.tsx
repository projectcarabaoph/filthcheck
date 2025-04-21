import React from 'react'
import { Icon } from '@iconify/react'

interface IMarketingFeatureCard {
    icon: string
    title: string
    description: string
}

export default function MarketingFeatureCard({ icon, title, description }: IMarketingFeatureCard) {
    return (
        <div className="bg-white p-6 rounded-md outline outline-[1px] outline-gray-200 hover:outline-[2px]">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Icon icon={icon} className="h-6 w-6 text-custome-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

