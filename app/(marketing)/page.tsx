
import MarketingHero from '@/app/(marketing)/_components/marketing-hero'
import MarketingFeatureGrid from '@/app/(marketing)/_components/marketing-feature-grid'

const Marketing = () => {

    return (
        <div className='flex flex-col w-full pt-16'>
            <div className="max-w-7xl mx-auto px-4 ">
                <MarketingHero />
                <MarketingFeatureGrid />
            </div>
        </div>
    )
}

export default Marketing