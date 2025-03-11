import { Code2, Zap, Lock, Globe, Database, Terminal } from 'lucide-react';

import MarketingFeatureCard from '@/app/(marketing)/_components/marketing-feature-card'

export default function MarketingFeatureGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <MarketingFeatureCard
                icon={Zap}
                title="Title Here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <MarketingFeatureCard
                icon={Lock}
                title="Title Here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <MarketingFeatureCard
                icon={Globe}
                title="Title Here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <MarketingFeatureCard
                icon={Code2}
                title="Title Here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <MarketingFeatureCard
                icon={Database}
                title="Title Here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <MarketingFeatureCard
                icon={Terminal}
                title="Title Here"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
        </div>
    )
}
