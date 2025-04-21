
import MarketingFeatureCard from '@/app/(marketing)/_components/marketing-feature-card'
import ListComponent from '@/components/shared/list-component'

import { featureList } from '@/utils/constants'

export default function MarketingFeatureGrid() {
    return (
        <div className='py-2 flex flex-col gap-2 items-center'>
            <span className=' text-gray-500'>Built with modern technologies such as</span>
            <ListComponent
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 "
                data={featureList}
                renderItem={(feature) => (
                    <MarketingFeatureCard
                        key={feature.title}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                )}
            />
        </div>
    )
}
