
import MarketingFeatureCard from '@/app/(marketing)/_components/marketing-feature-card'
import ListComponent from '@/components/shared/list-component'

import { featureList } from '@/utils/constants'

export default function MarketingFeatureGrid() {
    return (
        <ListComponent
            className="grid grid-cols-1  lg:grid-cols-2 gap-6 p-4 md:p-8"
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
    )
}
