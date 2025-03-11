
import MarketingHero from '@/app/(marketing)/_components/marketing-hero'
import MarketingFeatureGrid from '@/app/(marketing)/_components/marketing-feature-grid'
import MarketingStats from '@/app/(marketing)/_components/marketing-stats'
import MarketingCta from '@/app/(marketing)/_components/marketing-cta'

const Marketing = () => {

    return (
        <div className='flex flex-col w-full pt-16'>
            <div className="max-w-7xl mx-auto px-4 flex flex-col gap-8">
                <MarketingHero />
                <MarketingFeatureGrid />
            </div>
            <MarketingStats />
            <MarketingCta />
        </div>
    )
}

export default Marketing