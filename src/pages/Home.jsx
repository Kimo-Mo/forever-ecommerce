
import BestSeller from '../components/BestSeller';
import LatestCollection from '../components/LatestCollection';
import NewsLetter from '../components/NewsLetter';
import HeroSection from './../components/HeroSection';
import OurPolicy from './../components/OurPolicy';

const Home = () => {
  return (
    <>
      <HeroSection />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </>
  );
};

export default Home;
