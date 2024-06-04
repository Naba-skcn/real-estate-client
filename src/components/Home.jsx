import React from 'react';
import Banner from './Banner';
import Advertisement from './Advertisement';
import LatestReview from './LatestReview';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestReview></LatestReview>
        </div>
    );
};

export default Home;