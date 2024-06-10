import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const WelcomeContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'black',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6),
    },
}));

const WelcomeTypography = styled(Typography)(({ theme }) => ({
    color: '#d2ad5f',
    fontFamily: "'PT Serif', serif",
    [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(24),
    },
}));

const WelcomeButton = styled(Button)(({ theme }) => ({
    fontFamily: "'PT Serif', serif",
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const Welcome = () => {
    return (
        <div className="container mx-auto mt-10">
            <WelcomeContainer maxWidth="md">
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
                    `}
                </style>
                <WelcomeTypography variant="h1" gutterBottom>
                    Welcome to EstateNest
                </WelcomeTypography>
                <WelcomeTypography variant="body1" className="mt-6 text-lg leading-relaxed">
                    Your premier destination for all things real estate. Whether you're looking to buy, sell, or rent, we've got you covered. Explore the latest listings, connect with top agents, and find your dream home with ease.
                </WelcomeTypography>
                <Box className="mt-8 flex justify-center flex-wrap space-x-4">
                    <Link to='/all'>
                        <WelcomeButton variant="contained" color="primary">
                            Explore Listings
                        </WelcomeButton>
                    </Link>
                    <WelcomeButton variant="contained" color="success">
                        Contact an Agent
                    </WelcomeButton>
                </Box>
                <Box className="mt-8 text-center text-gray-600">
                    <WelcomeTypography variant="body2">
                        Have questions? Reach out to our support team anytime.
                    </WelcomeTypography>
                    <WelcomeTypography variant="body2">
                        Email: support@estatenest.com | Phone: (123) 456-7890
                    </WelcomeTypography>
                </Box>
            </WelcomeContainer>
        </div>
    );
};

export default Welcome;
