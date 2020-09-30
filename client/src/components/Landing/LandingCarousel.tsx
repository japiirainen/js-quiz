import { LandingCarouselCard } from './LandingCarouselCard'
import { landingCarouselData } from '../../../assets/staticData/landingPageData'

export const LandingCarousel: React.FC = () => {
   return <LandingCarouselCard data={landingCarouselData[0]} />
}
