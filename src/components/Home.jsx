import React from 'react';
import Banner from './Banner';
import Advertisement from './Advertisement';
import LatestReview from './LatestReview';
import About from './About';
import NeighborhoodGuidesSection from './NeighborHoodGuideSection';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestReview></LatestReview>
            <NeighborhoodGuidesSection></NeighborhoodGuidesSection>
             <About></About>
        </div>
    );
};

export default Home;