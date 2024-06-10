import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';

const Welcome = () => {
    return (
        <div className="container mx-auto  mt-10">
            <Container maxWidth="md" className="p-6 bg-black shadow-md rounded-lg">
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                    .font {
                        font-family: 'PT Serif', serif;
                    }
                    `}
                </style>
                <Typography variant="h1" className="text-center  text-[#d2ad5f] font" gutterBottom>
                    Welcome to EstateNest
                </Typography>
                <Typography variant="body1" className="mt-6 text-lg  text-[#d2ad5f] font text-center leading-relaxed">
                    Your premier destination for all things real estate. Whether you're looking to buy, sell, or rent, we've got you covered. Explore the latest listings, connect with top agents, and find your dream home with ease.
                </Typography>
                <Box className="mt-8 flex justify-center space-x-4">
                    <Link to='/all'>
                        <Button variant="contained" color="primary" className="font">
                            Explore Listings
                        </Button>
                    </Link>
                    <Button variant="contained" color="success" className="font">
                        Contact an Agent
                    </Button>
                </Box>
                <Box className="mt-8 text-center text-gray-600 font">
                    <Typography variant="body2">
                        Have questions? Reach out to our support team anytime.
                    </Typography>
                    <Typography variant="body2">
                        Email: support@estatenest.com | Phone: (123) 456-7890
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default Welcome;
